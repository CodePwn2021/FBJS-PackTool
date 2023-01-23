dialog_define = function() {
    let last_version = readFile(packerMainPath + "/data/last_version.txt");
    let last_codename = readFile(packerMainPath + "/data/last_codename.txt");
    let last_related = readFile(packerMainPath + "/data/last_related.txt");
    
    version = Dialog.prompt("请填写版本号\n不填为保持原来填写的内容\n上一次填写："+last_version);
    if(version != '') {
        writeFile(packerMainPath + "/data/last_version.txt",version,false);
    } else {
        version = last_version.replace("\n","");
    }
    
    codename = Dialog.prompt("请填写代号\n不填为保持原来填写的内容\n上一次填写："+last_codename);
    if(codename != '') {
        writeFile(packerMainPath + "/data/last_codename.txt",codename,false);
    } else {
        codename = last_codename.replace("\n","");
    }
    
    related = Dialog.prompt("请填写附加信息\n不填为保持原来填写的内容\n上一次填写：\n"+last_related);
    if(related != '') {
        writeFile(packerMainPath + "/data/last_related.txt",related,false);
    } else {
        related = last_related.replace("\n","");
    }
    
    parseTag();
}