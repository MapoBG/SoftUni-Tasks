function getFileName(input) {
    input = input.split("\\");
    let fileWithExtension = input[input.length - 1];
    let index = fileWithExtension.lastIndexOf(".");
    let fileName = fileWithExtension.substring(0, index);
    let extension = fileWithExtension.substring(index + 1);
    console.log(`File name: ${fileName}\nFile extension: ${extension}`);
}
getFileName('C:\\Projects\\Data-Structures\\LinkedList.cs.bak.gg')