use crate::ReviewDate;
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "kebab-case")]
pub enum NetworkId {
    Applovin,
    UnityAds,
    Mintegral,
    Meta,
    GoogleAds,
    Ironsource,
    Tiktok,
}
impl NetworkId {
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::Applovin => "applovin",
            Self::UnityAds => "unity-ads",
            Self::Mintegral => "mintegral",
            Self::Meta => "meta",
            Self::GoogleAds => "google-ads",
            Self::Ironsource => "ironsource",
            Self::Tiktok => "tiktok",
        }
    }
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Source {
    pub id: String,
    pub url: String,
    pub title: String,
    pub checked_at: ReviewDate,
    pub notes: String,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum ReviewBasis {
    PublicDocumentation,
    ConservativeLocalPolicy,
    OfficialTool,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "status", rename_all = "kebab-case", deny_unknown_fields)]
pub enum Rule<T> {
    Verified {
        value: T,
        sources: Vec<String>,
        basis: ReviewBasis,
        notes: String,
    },
    Unverified {
        reason: String,
        sources: Vec<String>,
        #[serde(skip_serializing_if = "Option::is_none")]
        candidate: Option<T>,
    },
}
impl<T> Rule<T> {
    pub fn verified_value(&self) -> Option<&T> {
        match self {
            Self::Verified { value, .. } => Some(value),
            Self::Unverified { .. } => None,
        }
    }
    pub fn candidate(&self) -> Option<&T> {
        match self {
            Self::Verified { .. } => None,
            Self::Unverified { candidate, .. } => candidate.as_ref(),
        }
    }
    pub(crate) fn any_value(&self) -> Option<&T> {
        self.verified_value().or_else(|| self.candidate())
    }
    pub fn sources(&self) -> &[String] {
        match self {
            Self::Verified { sources, .. } | Self::Unverified { sources, .. } => sources,
        }
    }
    pub fn notes(&self) -> &str {
        match self {
            Self::Verified { notes, .. } => notes,
            Self::Unverified { reason, .. } => reason,
        }
    }
}
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub enum SizeOperator {
    #[serde(rename = "<")]
    LessThan,
    #[serde(rename = "<=")]
    LessThanOrEqual,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum ByteBasis {
    ConservativeDecimalMb,
    OfficialToolBytes,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct SizeRule {
    pub limit_bytes: u64,
    pub operator: SizeOperator,
    pub byte_basis: ByteBasis,
}
impl SizeRule {
    pub fn accepts(&self, bytes: u64) -> bool {
        match self.operator {
            SizeOperator::LessThan => bytes < self.limit_bytes,
            SizeOperator::LessThanOrEqual => bytes <= self.limit_bytes,
        }
    }
    pub fn exceeds_headroom(&self, bytes: u64) -> bool {
        u128::from(bytes) * 100 > u128::from(self.limit_bytes) * 95
    }
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(
    tag = "kind",
    rename_all = "kebab-case",
    rename_all_fields = "camelCase",
    deny_unknown_fields
)]
pub enum Packaging {
    SingleHtml {
        entry_file: String,
        minified: bool,
    },
    Zip {
        entry_file: String,
        flat_root: bool,
        #[serde(default)]
        required_files: Vec<String>,
        #[serde(default)]
        name_matches_archive: bool,
    },
}
#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "kebab-case")]
pub enum ScriptPlacement {
    HeadBeforeRuntime,
    BodyBeforeRuntime,
}
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct HostScript {
    pub src: String,
    pub placement: ScriptPlacement,
    pub host_provided: bool,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum ExternalRequests {
    Forbidden,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct InlineRules {
    pub require_inline_assets: bool,
    pub external_requests: ExternalRequests,
    pub required_host_scripts: Vec<HostScript>,
    pub host_exceptions: Vec<HostScript>,
}
impl InlineRules {
    /// Exact declared host script only; the HTML/context scanner belongs to T014.
    pub fn permits_host_script(&self, script: &HostScript) -> bool {
        self.required_host_scripts.contains(script) && self.host_exceptions.contains(script)
    }
}
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum MraidVersion {
    #[serde(rename = "2.0")]
    V2,
    #[serde(rename = "3.0")]
    V3,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum ReadyPolicy {
    ReadyEventOrStateNotLoading,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ClickApi {
    #[serde(rename = "mraid.open")]
    MraidOpen,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct MraidRule {
    pub version: MraidVersion,
    pub ready: ReadyPolicy,
    pub click_api: ClickApi,
}
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "kebab-case")]
pub enum VendorHostRule {
    Dapi,
    MetaFbPlayableAd,
    #[serde(rename = "google-exitapi")]
    GoogleExitApi,
    MintegralGlobal,
    #[serde(rename = "tiktok-playable-sdk")]
    TikTokPlayableSdk,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum AudioPolicy {
    MutedUntilFirstInteraction,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum HiddenPolicy {
    MuteAndPause,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum TimerPolicy {
    FirstInteraction,
    ViewableAfterReady,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct AutoplayRule {
    pub audio: AudioPolicy,
    pub on_hidden: HiddenPolicy,
    pub timer_start: TimerPolicy,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum FirstClickRule {
    DistinctCtaOnly,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum ViewabilityPolicy {
    ReadyAndVisible,
}
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub enum HostVisibilityEvent {
    #[serde(rename = "viewableChange")]
    ViewableChange,
    #[serde(rename = "exposureChange")]
    ExposureChange,
    #[serde(rename = "visibilitychange")]
    DocumentVisibilityChange,
    #[serde(rename = "gameStart")]
    GameStart,
    #[serde(rename = "gameClose")]
    GameClose,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct ViewabilityRule {
    pub policy: ViewabilityPolicy,
    pub required_events: Vec<HostVisibilityEvent>,
    pub allow_initial_state_query: bool,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum OrientationRule {
    Both,
    Portrait,
    Landscape,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct PreviewRule {
    pub url: String,
    pub instructions: String,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Dimensions {
    pub width: u32,
    pub height: u32,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum ImageFormat {
    Jpg,
    Jpeg,
    Png,
    Gif,
    Bmp,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum CompanionScope {
    Campaign,
    Upload,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct CompanionAsset {
    pub id: String,
    pub scope: CompanionScope,
    pub dimensions: Vec<Dimensions>,
    pub formats: Vec<ImageFormat>,
    pub size: SizeRule,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct AdditionalRule {
    pub id: String,
    pub critical: bool,
    pub review: Rule<Value>,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Rules {
    pub upload_size: Rule<SizeRule>,
    pub packaging: Rule<Packaging>,
    pub inline: Rule<InlineRules>,
    pub mraid: Rule<Option<MraidRule>>,
    #[serde(default)]
    pub vendor_host: Option<Rule<VendorHostRule>>,
    pub autoplay: Rule<AutoplayRule>,
    pub first_click: Rule<FirstClickRule>,
    pub viewability: Rule<ViewabilityRule>,
    pub orientations: Rule<OrientationRule>,
    pub preview: Rule<PreviewRule>,
    pub companion_assets: Rule<Vec<CompanionAsset>>,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub(crate) struct RulePack {
    pub schema_version: String,
    pub profile_id: String,
    pub network_id: NetworkId,
    pub channel_id: String,
    pub rules_version: String,
    pub reviewed_at: ReviewDate,
    pub sources: Vec<Source>,
    pub rules: Rules,
    pub additional_rules: Vec<AdditionalRule>,
    pub unresolved: Vec<String>,
}
