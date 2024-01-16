fn transpose(matrix: [[i32; 3]; 3]) -> [[i32; 3]; 3] {
    let mut result: [[i32; 3]; 3] = [[0; 3]; 3];
    for i in 0..2 {
        for j in 0..2 {
            result[j][i] = matrix[i][j];
        }
    }
    return result;
}

fn pretty_print(matrix: &[[i32; 3]; 3]) {
    for row in matrix {
        println!("{:?}", row);
    }
}

fn main() {
    let matrix = [
        [101, 102, 103],
        [201, 202, 203],
        [301, 302, 303],
    ];

    println!("matrix: ");
    pretty_print(&matrix);

    let transposed = transpose(matrix);
    println!("transposed: ");
    pretty_print(&transposed);
}
