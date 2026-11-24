use serde::{Deserialize, Deserializer, Serialize, Serializer};
use std::{
    fmt,
    str::FromStr,
    time::{SystemTime, UNIX_EPOCH},
};

/// Valid Gregorian UTC calendar date, serialized exactly YYYY-MM-DD.
#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord)]
pub struct ReviewDate(String);
fn leap(year: u32) -> bool {
    year.is_multiple_of(4) && (!year.is_multiple_of(100) || year.is_multiple_of(400))
}
fn month_days(year: u32, month: u32) -> u32 {
    match month {
        2 => {
            if leap(year) {
                29
            } else {
                28
            }
        }
        4 | 6 | 9 | 11 => 30,
        _ => 31,
    }
}
impl FromStr for ReviewDate {
    type Err = String;
    fn from_str(text: &str) -> Result<Self, Self::Err> {
        let bytes = text.as_bytes();
        if bytes.len() != 10
            || bytes[4] != b'-'
            || bytes[7] != b'-'
            || bytes
                .iter()
                .enumerate()
                .any(|(i, b)| i != 4 && i != 7 && !b.is_ascii_digit())
        {
            return Err("Expected Gregorian YYYY-MM-DD".into());
        }
        let year: u32 = text[..4].parse().unwrap();
        let month: u32 = text[5..7].parse().unwrap();
        let day: u32 = text[8..].parse().unwrap();
        if !(1970..=9999).contains(&year)
            || !(1..=12).contains(&month)
            || day == 0
            || day > month_days(year, month)
        {
            return Err("Date is outside Gregorian 1970-01-01 through 9999-12-31".into());
        }
        Ok(Self(text.into()))
    }
}
impl ReviewDate {
    pub fn days_since_epoch(&self) -> u32 {
        let year: u32 = self.0[..4].parse().unwrap();
        let month: u32 = self.0[5..7].parse().unwrap();
        let day: u32 = self.0[8..].parse().unwrap();
        let before_year = |y: u32| 365 * (y - 1) + (y - 1) / 4 - (y - 1) / 100 + (y - 1) / 400;
        before_year(year) - before_year(1970)
            + (1..month).map(|m| month_days(year, m)).sum::<u32>()
            + day
            - 1
    }
    pub fn today_utc() -> Result<Self, String> {
        let mut days = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map_err(|e| e.to_string())?
            .as_secs()
            / 86_400;
        let mut year = 1970;
        while year <= 9999 {
            let count = if leap(year) { 366 } else { 365 };
            if days < count {
                break;
            }
            days -= count;
            year += 1;
        }
        if year > 9999 {
            return Err("System clock outside supported range".into());
        }
        let mut month = 1;
        while days >= u64::from(month_days(year, month)) {
            days -= u64::from(month_days(year, month));
            month += 1;
        }
        format!("{year:04}-{month:02}-{:02}", days + 1).parse()
    }
}
impl fmt::Display for ReviewDate {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.0)
    }
}
impl Serialize for ReviewDate {
    fn serialize<S: Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        serializer.serialize_str(&self.0)
    }
}
impl<'de> Deserialize<'de> for ReviewDate {
    fn deserialize<D: Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
        String::deserialize(deserializer)?
            .parse()
            .map_err(serde::de::Error::custom)
    }
}
