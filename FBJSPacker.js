if (!("libs_inthis" in this)) {
    throw "请使用“致”（FoxJavaScript）加载"
}

var packerMainPath = android.os.Environment.getExternalStorageDirectory() + "/Documents/FastCmdSupports/Packer";

var valuejs = packerMainPath + "/lib/value.js";

var Thread = java.lang.Thread;
/* DEFINE START*/
var manifest, mainjs, targetPath, cachePath, outputPath, log, definejs, aesjs, filejs, encryptjs, dialogjs, obfuscatorjs, rules, copyFolder, copyFile, writeFile, fuckClassName, defineWriter, deleteDir, encryptFunc, defineEncrypt, getFormtTime, dialog_version, dialog_define, version, codename, related;
/*DEFINE END*/
eval(readFile(valuejs));
eval(readFile(aesjs));
eval(readFile(filejs));
eval(readFile(encryptjs));
eval(readFile(dialogjs));
//eval(readFile(obfuscatorjs));

print("cleaning old files....");
deleteDir(cachePath);
deleteDir(outputPath);
outputPath.mkdir();
cachePath.mkdir();
print("clean old files success!");

print("packing...");

copyNeedEncryptFile(new java.io.File(targetPath, "Classes"), cachePath);

print("encrypting Define.js");
defineEncrypt();
print("Define.js encrypted!");

print("copying other file");
copyFile(new java.io.File(targetPath, "manifest.json"), new java.io.File(cachePath, "manifest.json"));
copyFile(new java.io.File(targetPath, "obfuscate_config.json"), new java.io.File(cachePath, "obfuscate_config.json"));
copyFile(new java.io.File(targetPath, "ScriptMain.js"), new java.io.File(cachePath, "ScriptMain_NoObfuscate.js"));
print("need request your input");
dialog_define();

/* ========== FUNCTION ========== */
function readFile(re) {
    if (new java.io.File(re).exists()) {
        var bu = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(re)));
        var data = '';
        var vv = bu.readLine();
        while (vv != 'END' && vv != null) {
            data += vv + '\n';
            vv = bu.readLine()
        }
        return String(data)
    } else {
        return ''
    }
}

function parseTag() {
    var manifest_str = readFile(manifest);
    var mainjs_str = readFile(mainjs);
    var nowTime = getFormtTime(Math.round(new Date() / 1000), true);
    manifest_str = manifest_str.replace("#RELATED#", "Script packed at: " + nowTime + "|" + related).replace("#VERSION#", version);
    mainjs_str = mainjs_str.replace("#CODENAME#", codename).replace("#VERSION#", version).replace("#RELEASE_TIME#", nowTime);
    writeFile(manifest, manifest_str, false);
    writeFile(mainjs, mainjs_str, false);
    writeFile(log, "====================\nPacked at: " + nowTime + "\nVersion: " + version + "\nCodeName: " + codename + "\nRelated: " + related, true);
    print("obfuscating ScriptMainJS...");
    startFBPacker();
}

function startFBPacker() {
    root_packer_thread = new Thread (){
        run: function() {
            var config = readFile(cachePath.toString() + "/obfuscate_config.json");
            config = config.replace("#SEED#", Math.random().toFixed(6).slice(-6)
);
            writeFile(cachePath.toString() + "/obfuscate_config.json", config, false);

            var subin = new java.lang.Runtime.getRuntime().exec("su");
            var su = new java.io.DataOutputStream(subin.getOutputStream());
            su.writeBytes(
            "export PATH=$PATH:/data/data/com.termux/files/usr/bin/\n"
            + "jsobfuscator " + cachePath.toString() + "/ScriptMain_NoObfuscate.js --config " + cachePath.toString() + "/obfuscate_config.json --output " + cachePath.toString() + "/ScriptMain.js\n"
            + "rm -r " + cachePath.toString() + "/ScriptMain_NoObfuscate.js\n"
            + "rm -r " + cachePath.toString() + "/obfuscate_config.json\n");
            su.flush();
            print("obfuscate ScriptMainJS success!");
            print("running fastbuilder packer");
            su.writeBytes("cp " + packerMainPath + "/lib/fastbuilder /data/local/tmp/\n"
            + "chmod 0755 /data/local/tmp/fastbuilder\n"
            + "/data/local/tmp/fastbuilder --pack-scripts " + cachePath.toString() + "/manifest.json\n"
            + "cp " + cachePath.toString() + "/com.codepwn.fastcmd.scb " + outputPath.toString() + "\n"
            + "mv " + outputPath.toString() + "/com.codepwn.fastcmd.scb " + outputPath.toString() + "/FastCmd_" + version + "_" + codename + ".scb\n"
            + "rm -f /data/local/tmp/fastbuilder\n"
            + "rm -rf " + cachePath.toString() + "\n");
            su.flush();
            su.close();
            subin.destroy();
        }
    };
    root_packer_thread.start();
    root_packer_thread.sleep(2000);
    print("pack success!");
}
