use criterion::{black_box, criterion_group, criterion_main, Criterion};
use object_size::{char_to_pixel, largest_size};

fn criterion_benchmark(c: &mut Criterion) {
    // Benchmark specific 
    c.bench_function("find 9x4", |b| {

        // Test set-up
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

        return b.iter(|| {        
            // Using the black_box function stops the compiler from constant-folding away the whole function and replacing it with a constant
            largest_size(black_box(&mut pixels))
        })
    });

    // Benchmark specific 
    c.bench_function("find 9x4 empty", |b| {

        // Test set-up
        let mut pixels = char_to_pixel(vec![
            vec!['.', '.', '.', '.'],
            vec!['.', '.', '.', '.'],
            vec!['.', '.', '.', '.'],
            vec!['.', '.', '.', '.'],
            vec!['.', '.', '.', '.'],
            vec!['.', '.', '.', '.'],
            vec!['.', '.', '.', '.'],
            vec!['.', '.', '.', '.'],
            vec!['.', '.', '.', '.'], 
        ]);

        return b.iter(|| {        
            // Using the black_box function stops the compiler from constant-folding away the whole function and replacing it with a constant
            largest_size(black_box(&mut pixels))
        })
    });    
}

// generate a benchmark group called benches, containing the criterion_benchmark
criterion_group!(benches, criterion_benchmark);

// macro to generate a main function which executes the benches group
criterion_main!(benches);