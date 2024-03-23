use std::collections::VecDeque;

type Operand = f64;

pub enum Operation {
    Add,
    Subtract,
    Divide,
    Multiply,
}

impl Operation {
    pub fn operate(self, num1: Operand, num2: Operand) -> Operand{
        match self {
            Operation::Add => num1 + num2,
            Operation::Subtract => num1 - num2,
            Operation::Divide => num1 / num2,
            Operation::Multiply => num1 * num2,
        }
    }
}


impl TryFrom<&str> for Operation {
    type Error = &'static str;

    fn try_from(s: &str) -> Result<Self, Self::Error> {
        match s {
            "+" => Ok(Operation::Add),
            "-" => Ok(Operation::Subtract),
            "/" => Ok(Operation::Divide),
            "*" => Ok(Operation::Multiply),
            _ => Err("Invalid operation"),
        }
    }
}

pub enum Token {
    Operation(Operation),
    Number(Operand)
}

impl Token {
    pub fn from(s: &str) -> Self {
        // See if the string is an operation
        if let Ok(o) = Operation::try_from(s) {
            return Token::Operation(o)
        }

        // If it fails to parse as an operation, it should be a number
        Token::Number(s.parse::<Operand>().expect("should be a number because it failed to parse as an operation"))
    }
}

pub fn input_to_tokens (input_string: &str) -> Vec<Token> {
    let mut tokens: Vec<Token> = vec![];

    for string in input_string.split_whitespace() {
        tokens.push(Token::from(string))
    }

    return tokens
}

pub fn get_result(tokens: Vec<Token>) -> Operand {
    let mut stack: VecDeque<Operand> = VecDeque::new();

    for token in tokens {
        match token {
            Token::Operation(o) => {
                let v1 = stack.pop_back().expect("Should be item in the stack");
                let v2 = stack.pop_back().expect("Should be item in the stack");

                stack.push_back(o.operate(v1, v2));
            },
            Token::Number(n) => stack.push_back(n),
        }
    }

    
    stack.pop_back().expect("Should be item in the stack")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_input_to_tokens() {
        let input_string = "10 5 10 - + 10 *";
        let tokens = input_to_tokens(input_string);

        assert_eq!(tokens.len(), 7);
    }

    #[test]
    fn test_get_result() {
        let input_string = "10 5 10 - + 10 *";
        let tokens = input_to_tokens(input_string);

        let result = get_result(tokens);

        assert_eq!(result, 150.0);
    }

    #[test]
    fn test_get_result_multiply() {
        let input_string = "10 5 10 10 * * *";
        let tokens = input_to_tokens(input_string);

        let result = get_result(tokens);

        assert_eq!(result, 5000.0);
    }    
}
