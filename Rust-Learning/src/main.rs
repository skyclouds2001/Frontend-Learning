fn main() {
    println!("Hello, world!");
    // basic
    let ii: i8 = 1;
    let uu: u8 = 2;
    let ff: f32 = 2.3;
    let ss: &str = "abc";
    let ch: char = 'a';
    let bb: &[u8] = b"abc";
    let bo: bool = true;
    println!("ii: {ii}");
    println!("uu: {uu}");
    println!("ff: {ff}");
    println!("ss: {ss}");
    println!("ch: {ch}");
    println!("bb: {bb:?}");
    println!("bo: {bo}");
    // array
    let arr: [i8; 10] = [42; 10];
    println!("array: {:?}", arr);
    // tuple
    let tup: (i8, bool) = (7, true);
    println!("tuple: {:?}", tup);
    // reference
    let mut rv: i8 = 1;
    let rf: &mut i8 = &mut rv;
    println!("reference: {rf}");
    // slice
    let ar: &[i8] = &arr[2..4];
    println!("slice: {:?}", ar);
    // function
    println!("function: {}", is_equal(2, 3))
}

fn is_equal(x: i8, y: i8) -> bool {
    return x == y;
}
