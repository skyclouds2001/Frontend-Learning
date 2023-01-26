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
    println!("function: {}", is_equal(2, 3));
    let c: Circle = Circle { radius: 5 };
    println!("struct: {}", c.area());

    // variable
    // rust can auto infer type of variables
    const CONST: i8 = 10;  // like constexpr in C++
    static STATIC: i8 = 1;  // like const or global variable in C++
    println!("const: {}", CONST);
    println!("static: {}", STATIC);
    // variable scope and shadow

    // memory manage
    // stack - static size | organized
    // heap - changeable size | unorganized
    // ownership - variable only available in its own scope and lose after leaving the scope | any value only belongs to one owner in any condition | any value has an owner
    // copy -  for simple value, it will act like copy, while for complex value, only newer variable will be available and older variable will be unable to use
    // clone - use copy variable for complex value
    // borrow - function param can borrow value as reference instead of clone or copy | can be only single mutable value but many immutable values
}

fn is_equal(x: i8, y: i8) -> bool {
    return x == y;
}

struct Circle {
    radius: u64,
}

impl Circle {
    fn area (&self) -> u64 {
        return self.radius * self.radius * 3.1415926 as u64;
    }
}
