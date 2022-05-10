copyFolder = function(srcFile, descFile) {
    if(srcFile.isDirectory()) {
        var newFolder = new java.io.File(descFile, srcFile.getName());
        if(!newFolder.exists()) {
            newFolder.mkdirs();
        }
        var listFiles = srcFile.listFiles();
        listFiles.forEach((value, index, array) =>{
            copyFolder(value, newFolder);
        });
    } else {
        var newFile = new java.io.File(descFile, srcFile.getName());
        copyFile(srcFile, newFile);
    }
}

copyFile = function(srcFile, descFile) {
    new java.nio.file.Files.copy(srcFile.toPath(), descFile.toPath());
}

writeFile = function(path, text, isAppend) {
    var target = new java.io.FileOutputStream(path,isAppend);
    target.write(new java.lang.String(text).getBytes());
    target.close();
};

deleteDir = function(dir) {
    if(!dir.exists()) {
        return;
    }
    if(dir.isDirectory()) {
        children = dir.list();
        children.forEach((value, index, array) => {
            var success = deleteDir(new java.io.File(dir, value));
            if(!success) {
                return false;
            }
        });
    }
    filePath = dir.toPath();
    new java.nio.file.Files.delete(filePath);
    return true;
}
/*
public static boolean deleteDir(File dir){
        LOG.info("deleteDir删除文件路径：{}",dir);
        if (dir.isDirectory()){
            String[] children = dir.list();
            for (int i=0;i<children.length;i++){
                boolean success = deleteDir(new File(dir,children[i]));
                if (!success){
                    return false;
                }
            }
        }
        Path filePath = dir.toPath();
        try{
            Files.delete(filePath);
        } catch (IOException e){
            LOG.error("deleteDir删除文件失败：",e);
        }
        return true;
    }
*/