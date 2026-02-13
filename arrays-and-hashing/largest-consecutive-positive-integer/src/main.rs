use largest_consecutive_positive_integer::sort;


pub fn main() {
    let mut input = vec![1, 3, 6, 4, 1, 2];

    assert_eq!(sort(&mut input), Some(4))
}

