use object_size::{calculate_size, char_to_pixel};



fn main() {
    // General notes:
    //  - We are mutating the pixels in place, so no need to use an external data structure to capture seen / not seen
    //    (Likely more performant than using a HashSet or similar, saves a lookup / a)
    //  - Calculating the largest shape is as simple as keeping track of the current largest shape and then
    //    comparing it to the size of the current shape
    //  - Speed is NM, where N is the number of rows and M is the number of columns, cannot be faster than this
    //     because we MUST visit every pixel at least once. 
    //
    // Optimization notes:
    //  - If we have already seen the pixel:
    //      - It must have been a part of a shape we have already calculated
    //      - OR it is a part of a shape that we are already calculating
    //  - Can compress the on / seen state into a single bit, the 'seen' state is the same as the 'off' state
    // 
    // Optimization to implement:
    //  - An optimization might be to check to see if the future pixel is on, off, seen before we recurse
    //     this would save creating a stack frame
    //  - Could skip checking the pixel we came from, though this would be a minor optimization
    //
    // Non-optimizations:
    //  - Knowing that pixels are checked top to bottom, left to right, it might be intuitive to skip checking up and left
    //      though this is not possible see 'test_native_skip_up'
    let mut pixels = char_to_pixel(vec![
        vec!['.', '.', '.', '+'],
        vec!['.', '+', '.', '.'],
        vec!['+', '+', '+', '.'],
        vec!['.', '+', '.', '.'],
        vec!['.', '.', '.', '.'],
        vec!['.', '+', '.', '+'],
        vec!['.', '+', '+', '+'],
        vec!['.', '.', '.', '.'],
        vec!['.', '+', '.', '+'], 
    ]);

    let mut largest = 0;

    for y in 0..pixels.len() {
        for x in 0..pixels[y].len() {
            let size = calculate_size(&mut pixels, x, y);

            if size > 0 {
                println!("Found shape with size: {} at ({}, {})", size, x, y);
            }

            if size > largest {
                largest = size;
                println!("Largest found: {}", size);
            }
        }
    }
}
