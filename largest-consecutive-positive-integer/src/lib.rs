use std::collections::{BTreeSet, HashSet};


pub fn sort(input: &mut Vec<i32>) -> Option<i32> {
    input.sort(); // Time: N * Log N
    input.dedup();


    // If we cannot find 1, there is no largest consecutive integer
    let search_from = input.binary_search(&1).ok()?; // Time: Log N

    let mut number_to_check = 1;

    // Time: N
    for number in &input[search_from..] {
        if *number != number_to_check {
            break            
        }

        number_to_check += 1
    }

    // The number we were looking for was 1 too high, the value - 1 of this is the highest number
    Some(number_to_check - 1)
}


pub fn btree(input: &mut Vec<i32>) -> Option<i32> {
    let mut ordered_set: BTreeSet<&mut i32> = BTreeSet::new();

    // Time: BTree is N * (log N) insert
    for number in input {
        if *number > 0 {
            ordered_set.insert(number);
        }
    }

    if ordered_set.len() == 0 || !ordered_set.contains(&1) {
        return None
    }

    let mut number_to_check = 1;

    for number in ordered_set {
        if *number != number_to_check {
            break            
        }

        number_to_check += 1
    }

    return Some(number_to_check - 1)
}


pub fn hashset(input: &mut Vec<i32>) -> Option<i32> {
    let mut set = HashSet::<i32>::new();

    // Time: Hash Set is N * O(1)
    for number in input {
        if *number > 0 {
            set.insert(*number);
        }
    }

    if set.len() == 0 || !set.contains(&1) {
        return None
    }

    let mut number_to_check = 1;

    // Time: Hash Set is N * O(1)
    loop {
        match set.get(&number_to_check) {
            Some(_) => number_to_check += 1,
            None => break,
        }
    }

    return Some(number_to_check - 1)
}


#[cfg(test)]
mod test {
    use crate::hashset;


    #[test]
    fn simple() {
        let mut input = vec![3, 6, 4, 1];

        assert_eq!(hashset(&mut input), Some(1))
    }

    #[test]
    fn duplicates() {
        let mut input = vec![1, 4, 6, 4, 2, 2];

        assert_eq!(hashset(&mut input), Some(2))
    }    

    #[test]
    fn no_positive_integers_without_zero() {
        let mut input = vec![-1, -2, -3];

        assert_eq!(hashset(&mut input), None)
    }

    #[test]
    fn no_positive_integers_with_zero() {
        let mut input = vec![-1, -2, -3, 0];

        assert_eq!(hashset(&mut input), None)
    }

    #[test]
    fn positive_with_negative() {
        let mut input = vec![-1, -2, -3, 0, 1, 3];

        assert_eq!(hashset(&mut input), Some(1))
    }

    #[test]
    fn with_with_zero() {
        let mut input = vec![0];

        assert_eq!(hashset(&mut input), None)
    }    

    #[test]
    fn with_with_only_1() {
        let mut input = vec![0, 1, 1];

        assert_eq!(hashset(&mut input), Some(1))
    }

    #[test]
    fn last_is_the_highest() {
        let mut input = vec![1, 2, 3, 4, 5, 6, 7];

        assert_eq!(hashset(&mut input), Some(7))
    }    
}