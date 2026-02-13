use object_size::{char_to_pixel, largest_size};

fn main() {
    let mut pixels = char_to_pixel(vec![
        vec!['.', '.', '.', '+'],
        vec!['.', '+', '.', '.'],
        vec!['+', '+', '+', '.'],
        vec!['.', '+', '.', '.'],
        vec!['.', '+', '.', '.'],
        vec!['.', '.', '.', '.'],
        vec!['.', '+', '.', '+'],
        vec!['.', '+', '+', '+'],
        vec!['.', '.', '.', '.'],
        vec!['.', '+', '.', '+'], 
    ]);

    println!("Largest Size: {}", largest_size(&mut pixels))
}
