use polish_notation::{get_result, input_to_tokens};

fn main() {
    let input_string = "10 5 10 - + 10 *";

    let tokens = input_to_tokens(input_string);

    let result = get_result(tokens);

    println!("Total: {}", result);
}
