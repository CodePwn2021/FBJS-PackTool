fuckClassName = function() {
/*
    var fuckRules = readFile(rules).split("\n");
    var randNum = Math.floor((Math.random()*fuckRules.length));
    return fuckRules[randNum];
*/
return Math.floor(Math.random() * 0xffffffff).toString(16).padEnd(8, "0");
}

copyNeedEncryptFile = function(srcFile, descFile) {
    var newFolder = new java.io.File(descFile, srcFile.getName());
    if(srcFile.isDirectory()) {
        var listFiles = srcFile.listFiles();
        listFiles.forEach((value, index, array) =>{
            copyNeedEncryptFile(value, newFolder);
        });
    } else {
        if(srcFile.toString().indexOf('.bak') != -1) {
            return;
        }
        var newFile = new java.io.File(cachePath, fuckClassName()+".js");
        encryptFile(srcFile, newFile);
    }
}

defineWriter = function(path, fileName) {
    var filter = "/storage/emulated/0/Documents/FastCmdSupports/main/Classes/";
    var newFileName = fileName;
    var newRequireName = path.replace(filter, "").replace(".js","").replace("/",".");
    var template = 'loadModule("import","'+newRequireName+'","'+newFileName+'");\n';
    writeFile(definejs, template, true);
    writeFile(log, newRequireName+" => "+newFileName+"\n", true);
    print(newRequireName+" => "+newFileName);
}

defineEncrypt = function() {
   var encrypted_definejs = 'module.exports="CodePwn2021_Encrypted'+encryptFunc(readFile(definejs))+'Encrypted_END";';
   writeFile(definejs, encrypted_definejs, false);
}

encryptFile = function(srcFile, descFile) {
    var after = descFile.toString().replace(cachePath.toString(), "").replace("/","");
    defineWriter(srcFile.toString(),after);
    /*
        var packer = new Packer;
        packer.pack(script <string>, isBase62 <boolean>, isShink <boolean>);
        ===========================
        script: 需要压缩的脚本
        isBase62: 是否开启Base62编码
        开启Base62编码后，开头会变成eval(function(p,a,c,k,e,r)，不建议开启
        isShink: 是否混淆变量，不建议开启
    */
   // var packer = new Packer;
    var need_encrypt = readFile(srcFile);
    need_encrypt = need_encrypt.replace("module.exports = ","");
    
    var encrypted = encryptFunc(need_encrypt);
    encrypted = 'module.exports="CodePwn2021_Encrypted'+encrypted+'Encrypted_END";';
    writeFile(descFile, encrypted, false);
}

encryptFunc = function(str) {
    return CryptoJS.AES.encrypt(str, CryptoJS.enc.Utf8.parse("QUmdTISWvlo4KAy1"), {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: CryptoJS.enc.Utf8.parse("aX0WFnOUAC9cZrD4")
    }).toString();
}