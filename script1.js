if(ObjC.available){
    var paths = ["Cydia.app","mobileSubstrate.dyld","/bin/bash","/sshd","/apt"];
    Interceptor.attach(ObjC.classes.NSFileManager["- fileExistsAtPath:"].implementation, {
        onEnter(args){
            var path = new ObjC.Object(args[2]).toString();
            this.jailbroken = 0;

            for(let i=0; i<paths.length; i++){
                if(path.indexOf(paths[i]) > 0){
                    this.jailbroken = 1;
                    console.log(`[+] fileExistsAtPath(${path})`);
                    break;
                }
            }
            console.log(`[+] fileExistsAtPath(${path})`);
        },
        onLeave(retval){
            if(this.jailbroken == 1){
                retval.replace(new NativePointer(0x0));
                console.log(`[-] manipulated return value: ${retval}`);
            }
            console.log(`[-] return value: ${retval}`);
        }
    });

    Interceptor.attach(ObjC.classes.NSString["- writeToFile:atomically:encoding:error:"].implementation, {
        onEnter(args){
            var path = new ObjC.Object(args[2]).toString();
            this.jailbroken = 0;
            if(path.indexOf("jailbreak.txt") > 0){
                this.jailbroken = 1;
                console.log(`[+] writeToFile(${path})`);
            }
            console.log(`[+] writeToFile(${path})`);
        },
        onLeave(retval){
            if(this.jailbroken == 1){
                retval.replace(new NativePointer(0x0));
                console.log(`[-] manipulated return value: ${retval}`);
            }
            console.log(`[-] return value: ${retval}`);
        }
    });

    Interceptor.attach(ObjC.classes.UIApplication["- canOpenURL:"].implementation, {
        onEnter(args){
            var path = new ObjC.Object(args[2]).toString();
            this.jailbroken = 0;
            if(path.indexOf("cydia") >= 0){
                this.jailbroken = 1;
                console.log(`[+] canOpenURL(${path})`);
            }
            console.log(`[+] canOpenURL(${path})`);
        },
        onLeave(retval){
            if(this.jailbroken == 1){
                retval.replace(new NativePointer(0x0));
                console.log(`[-] manipulated return value: ${retval}`);
            }
            console.log(`[-] return value: ${retval}`);
        }
    });
}