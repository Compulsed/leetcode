use criterion::{black_box, criterion_group, criterion_main, Criterion};
use largest_consecutive_positive_integer::{btree, hashset, sort};
use rand::Rng;


fn criterion_benchmark(c: &mut Criterion) {
    const ITERATIONS: i32 = 100_000;
    const MAX_NUMBER: i32 = 10;

    c.bench_function("btree", |b| {
        let mut input: Vec<i32> = (0..ITERATIONS).map(|v| v + 1000).collect();

        return b.iter(|| {        
            btree(black_box(&mut input))
        })
    });

    c.bench_function("btree - random", |b| {
        let mut rng = rand::thread_rng();

        let mut input: Vec<i32> = (0..ITERATIONS).map(|v| rng.gen_range(0..MAX_NUMBER)).collect();

        return b.iter(|| {        
            btree(black_box(&mut input))
        })
    });


    c.bench_function("hashset", |b| {
        let mut input: Vec<i32> = (0..ITERATIONS).map(|v| v + 1000).collect();

        return b.iter(|| {        
            hashset(black_box(&mut input))
        })
    });

    c.bench_function("hashset - random", |b| {
        let mut rng = rand::thread_rng();

        let mut input: Vec<i32> = (0..ITERATIONS).map(|v| rng.gen_range(0..MAX_NUMBER)).collect();

        return b.iter(|| {        
            hashset(black_box(&mut input))
        })
    });

    c.bench_function("sort", |b| {
        let mut input: Vec<i32> = (0..ITERATIONS).map(|v| v + 1000).collect();

        return b.iter(|| {        
            sort(black_box(&mut input))
        })
    });    

    c.bench_function("sort - random", |b| {
        let mut rng = rand::thread_rng();

        let mut input: Vec<i32> = (0..ITERATIONS).map(|v| rng.gen_range(0..MAX_NUMBER)).collect();

        return b.iter(|| {        
            sort(black_box(&mut input))
        })
    });    

}

// generate a benchmark group called benches, containing the criterion_benchmark
criterion_group!(benches, criterion_benchmark);

// macro to generate a main function which executes the benches group
criterion_main!(benches);