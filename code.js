// global data...
const shiftTable = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
let key = '0001001100110100010101110111100110011011101111001101111111110001';
const PC_1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27,
    19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6,
    61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4]; // PC-1, 64-bit ------> 56-bit, 

const PC_2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16,
    7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53,
    46, 42, 50, 36, 29, 32]; // PC-2, 56-bit ------> 48-bit, 

const IP = [58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22,
    14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11,
    3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7] //Intial permutation IP -------> 64-bit

const S_BOX_1 = [[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
[0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
[4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
[15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]]

const S_BOX_2 = [[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
[3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
[0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
[13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]];

const S_BOX_3 = [[10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
[13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
[13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
[1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]];

const S_BOX_4 = [[7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
[13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
[10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
[3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]];

const S_BOX_5 = [[2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
[14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
[4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
[11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]];

const S_BOX_6 = [[12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
[10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
[9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
[4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]];

const S_BOX_7 = [[4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
[13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
[1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
[6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]];

const S_BOX_8 = [[13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
[1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
[7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
[2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]];

const all_sBox = [S_BOX_1, S_BOX_2, S_BOX_3, S_BOX_4, S_BOX_5, S_BOX_6, S_BOX_7, S_BOX_8];// 3D array that holds all sboxs 😱😱😱😱😱😱😱

const P__ = [16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25]

const P_1 = [40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 
    29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25]

function permutation(inputKey, PC_X) { // fun(1) ... for first and second key permutation...
    let permutedKey = '';
    PC_X.map((elem) => {
        permutedKey += inputKey[elem - 1] // concatenating...
    })
    return permutedKey;
}

function divider(dataToDivided) { // fun(2) ... for dividing the key to tow parts right and left... __Edited__
    let leftHalf = '';
    let rightHalf = '';
    let j = 0;
    // let dividedData = keyPermutation(dataToDivided, PC_1);
    half = dataToDivided.length / 2;
    j = half;
    for (let i = 0; i < half, j < dataToDivided.length; i++ , j++) {
        leftHalf += dataToDivided[i];
        rightHalf += dataToDivided[j]
    }
    return [leftHalf, rightHalf];
}
function circularShiftLeft(arr) { // fun(3)
    let newArr = '';
    for (let i = 1; i < arr.length; i++) {
        newArr += arr[i];
    }
    newArr += arr[0];
    return newArr;
}

function keyOperations() { // fun(4)      __Edited__
    let rightSubKeys = []; // array to hold 16 right subkeys
    let leftSubKeys = []; // array to hold 16 left subkeys
    let entireKey = []; // array to hold 16 keys (concatenation of left and right)
    let finalEntireKey = [];
    let permutedKey = permutation(key, PC_1); // first permutation of the key
    let leftKey = divider(permutedKey)[0];
    let rightKey = divider(permutedKey)[1];
    // add all subkeys to one array (left, right), 'elem' value of each element in shiftTable
    shiftTable.map((elem) => {
        for (let i = 0; i < elem; i++) {
            leftKey = circularShiftLeft(leftKey); // apply shift for each subkey to produce 16 keys
            rightKey = circularShiftLeft(rightKey);
        }
        leftSubKeys.push(leftKey);
        rightSubKeys.push(rightKey);
    })
    for (let i = 0; i < leftSubKeys.length; i++) { // concate right subkeys and left subkeys into one array 'entireKey'.
        const keyCouples = leftSubKeys[i] + rightSubKeys[i];
        entireKey[i] = keyCouples;

    }
    for (let i = 0; i < entireKey.length; i++) { // Applying the second permution ... PC_2
        let permutedKey = permutation(entireKey[i], PC_2);
        finalEntireKey.push(permutedKey); // 48-bit
    }
    // console.log('leftSubKeys:', leftSubKeys);
    // console.log('rightSubKeys:', rightSubKeys);
    // console.log('entireKey:', entireKey);
    // console.log('finalEntireKey:', finalEntireKey);
    return finalEntireKey;
}
/* End of subkeys generation */

/* Start of Input operations ------------------------------ */
/* Start of f manglet function */
let input = '0000000100100011010001010110011110001001101010111100110111101111'
function expansion(inputRight) {
    let i = 0; // index for outer for loop
    let j = 0; // index for inner for loop  
    let count = 0; // to count from 0 to 31 of right input...
    let expandedBlock = ''; // variable to hold 6-bit blocks of the expanded input 
    let expandedInput = []; // array to hold the entire expanded input

    for (i = 0; i < 8; i++) {
        /* store last bit from the previous block of 4-bit blocks to the next block of 6-bit blocks,
        - 4-bit blocks --> input before expanding   R0 = 1111 0000 1010 1010 1111 0000 1010 1010 
        - 6-bit blocks --> input after expanding E(R0) = 011110 100001 010101 010101 011110 100001 010101 010101 */
        preBit = (count + 31) % 32;
        expandedBlock += inputRight[preBit]
        for (j = 0; j < 4; j++ , count++) {
            expandedBlock += inputRight[count];
        }
        expandedBlock += inputRight[(count + 32) % 32];
        expandedInput.push(expandedBlock);
        expandedBlock = '';
    }
    expandedInput = expandedInput.toString().replace(/,/ig, '');
    return expandedInput;
}

function XOR(firstOperand = '1100', secondOperand = '0011') {
    let xoredData = [];
    for (let i = 0; i < firstOperand.length; i++) {
        if (firstOperand[i] == secondOperand[i]) {
            xoredData[i] = '0';
        }
        else
            xoredData[i] = '1';
    }
    xoredData = xoredData.toString().replace(/,/ig, '');
    return xoredData;
}
// fun used to divide result of XOR of expanded input(48-bit) and key(48-bit) into eight 6bit-blocks(48-bit)
function sixBitBlocks(data) {
    let block = '';
    let blocks = [];
    for (let i = 1; i <= data.length; i++) {
        block += data[i - 1];
        if (i % 6 === 0) {
            blocks.push(block);
            block = '';
        }
    }
    return blocks;
}
function sBoxOperations(blocks) { // apply all operations of s-box...
    const sBoxSelection = [];
    let row = '';
    let col = '';
    let fourBitsBlock;
    let length;
    for (let i = 0; i < 8; i++) {
        row = blocks[i][0] + blocks[i][5];
        col = blocks[i][1] + blocks[i][2] + blocks[i][3] + blocks[i][4];
        row = parseInt(row, 2);
        col = parseInt(col, 2);
        fourBitsBlock = all_sBox[i][row][col];
        fourBitsBlock = fourBitsBlock.toString(2); // convert integer to string of bits...
        length = fourBitsBlock.length;
        for (; length < 4; length++) {
            fourBitsBlock = '0' + fourBitsBlock;
        }
        sBoxSelection.push(fourBitsBlock);
    }
    return sBoxSelection;
}
// mangler  function in DES
function manglerFun(inputRight, kIndex) {
    const expandedInput = expansion(inputRight);
    const finalEntireKey = keyOperations();
    const exInputXORKey = XOR(expandedInput, finalEntireKey[kIndex]);

    // start of s-box functions ----------
    let blocks = sixBitBlocks(exInputXORKey); // get eight 6bit-blocks 
    let fourBitBlocks = sBoxOperations(blocks); // get eight 4bit-blocks  from get eight 6bit-blocks 
    fourBitBlocks = fourBitBlocks.toString().replace(/,/ig, '');
    // End of s-box functions -----------

    const p = permutation(fourBitBlocks, P__);// applying 'P__' permutation on s-box output, and that's last operation in 'mangler function'
    return p;
}
// Main function for operations applied to input -----------------------------------------//
let LEFT_INPUT;
let RIGHT_INPUT;
let finalCipher;
function DESEncryption() {
    // Start functions that are DONE only one time---- 
    const intitPermutation = permutation(input, IP);
    LEFT_INPUT = divider(intitPermutation)[0];
    RIGHT_INPUT = divider(intitPermutation)[1];
    // End functions that are DONE only one time---- 

    let manglerFunOut;
    for (let i = 0; i < 16; i++) {
        manglerFunOut = manglerFun(RIGHT_INPUT, i);
        tempRightInput = RIGHT_INPUT;
        RIGHT_INPUT = XOR(manglerFunOut, LEFT_INPUT);
        LEFT_INPUT = tempRightInput;
    }
    console.log('LEFT_INPUT_16_from_ENC: ', LEFT_INPUT);
    console.log('__RIGHT_INPUT_16_from_ENC:', RIGHT_INPUT);
    // We reverse the order of these two blocks and apply the final permutation(P_) //
    const cipherTxt = RIGHT_INPUT + LEFT_INPUT; 
    finalCipher = permutation(cipherTxt, P_1);
    console.log('__finalCipher__', finalCipher);
    return finalCipher;
}
function DESdecryption() {
    let finalCipher = DESEncryption();
    console.log('___________________________limiter between Enc and Dec____________________________');
    // Start functions that are DONE only one time---- 
    const intitPermutation = permutation(finalCipher, IP);
    LEFT_INPUT = divider(intitPermutation)[0];
    RIGHT_INPUT = divider(intitPermutation)[1];
    // End functions that are DONE only one time---- 

    let manglerFunOut;
    for (let i = 15; i >= 0; i--) {
        manglerFunOut = manglerFun(RIGHT_INPUT, i);
        tempRightInput = RIGHT_INPUT;
        RIGHT_INPUT = XOR(manglerFunOut, LEFT_INPUT);
        LEFT_INPUT = tempRightInput;
    }
    console.log('LEFT_INPUT_16_from_DEC: ', LEFT_INPUT);
    console.log('__RIGHT_INPUT_16_from_DEC:', RIGHT_INPUT);

    const cipherTxt = RIGHT_INPUT + LEFT_INPUT; // We reverse the order of these two blocks and apply the final permutation(P_)
    console.log('__decTxt_from_DEC:', cipherTxt);

    finalCipher = permutation(cipherTxt, P_1);
    console.log('___finalDecTxt___:', finalCipher);
}
DESdecryption();