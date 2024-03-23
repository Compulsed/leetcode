pub struct Pixel {
    on: bool,
}

impl Pixel {
    fn new(on: char) -> Pixel {
        let on = match on {
            '+' => true,
            '.' => false,
            _ => false,
        };

        Pixel {
            on,
        }
    }

}

#[inline]
pub fn calculate_size(pixels: &mut Vec<Vec<Pixel>>, x: usize, y: usize) -> usize {
    let mut sum: usize = 0;

    // Base case: When the pixel has already been seen OR the pixel is off
    if !pixels[y][x].on {
        return 0;
    } 
    
    // Mark the pixel as seen, and increment the sum.
    // Note: It is important to mark seen BEFORE recursing otherwise we sub-step will
    //  loop back to the current pixel and we will get a stack overflow
    pixels[y][x].on = false;
    sum += 1;

    // Up, y - 1
    if y > 0 {
        sum += calculate_size(pixels, x, y - 1)
    }

    // Down, y + 1
    if y + 1 < pixels.len() {
        sum += calculate_size(pixels, x, y + 1)
    }    

    // Left, x - 1
    if x > 0 {
        sum += calculate_size(pixels, x - 1, y)
    }

    // Right, x + 1
    if x + 1 < pixels[y].len() {
        sum += calculate_size(pixels, x + 1, y)
    }

    sum
}

#[inline]
pub fn char_to_pixel(char_array: Vec<Vec<char>>) -> Vec<Vec<Pixel>> {
    let mut pixels = Vec::new();

    for row in char_array {
        let mut pixel_row = Vec::new();

        for pixel in row {
            pixel_row.push(Pixel::new(pixel));
        }

        pixels.push(pixel_row);
    }

    pixels
}

pub fn largest_size(pixels: &mut Vec<Vec<Pixel>>) -> usize {
    let mut largest = 0;

    for y in 0..pixels.len() {
        for x in 0..pixels[y].len() {
            let size = calculate_size(pixels, x, y);

            if size > largest {
                largest = size;
            }
        }
    }

    largest
}


#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_largest_size() {
        let mut pixels = char_to_pixel(vec![
            vec!['.', '+', '.', '+'],
            vec!['.', '+', '.', '.'],
            vec!['+', '+', '+', '.'],
            vec!['.', '+', '.', '.'],
            vec!['.', '.', '.', '.'],
            vec!['.', '+', '.', '+'],
            vec!['.', '+', '+', '+'],
            vec!['.', '.', '.', '.'],
            vec!['.', '+', '.', '+'], 
        ]);

        assert_eq!(largest_size(&mut pixels), 6);
    }

    #[test]
    fn test_native_skip_up() {
        let mut pixels = char_to_pixel(vec![
            vec!['.', '.', '.', '+'],
            vec!['.', '+', '.', '+'],
            vec!['.', '+', '+', '+'],
        ]);

        assert_eq!(largest_size(&mut pixels), 6);
    }    

    #[test]
    fn test_largest_size_single_off_pixel() {
        let mut pixels = char_to_pixel(vec![
            vec!['.'] 
        ]);

        assert_eq!(largest_size(&mut pixels), 0);
    }

    #[test]
    fn test_largest_size_single_on_pixel() {
        let mut pixels = char_to_pixel(vec![
            vec!['+'] 
        ]);

        assert_eq!(largest_size(&mut pixels), 1);
    }    
}