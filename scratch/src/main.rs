
pub fn merge_alternately(s1: String, s2: String) -> String {
    let mut result: Vec<char> = vec![];

    let mut s1_chars = s1.chars();
    let mut s2_chats = s2.chars();

    loop {
        match (s1_chars.next(), s2_chats.next()) {
            (None, None) => break,
            (a, b) => {
                if let Some(c1) = a {
                    result.push(c1)
                }

                if let Some(c2) = b {
                    result.push(c2)
                }                
            }
        }
    }

    return result.into_iter().collect();
}


fn main() {



}
