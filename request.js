function sendRequest (method ,url) {
    return new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        let splitUrl = url.split('//');
        if(splitUrl[0] !== "https:") {
            splitUrl.splice(0, 1 ,"https:");
            let newUrl = splitUrl.join('//')

            console.log(newUrl)

            xhr.open(method, newUrl);

            xhr.responseType = 'json'

            xhr.onload = () => {
                if(xhr.status >= 400) {
                    reject(xhr.response)
                } else {
                    resolve(xhr.response)
                }      
            }

            xhr.onerror = () => {
                reject(xhr.response)
            }

            xhr.send()
        } else {
            xhr.open(method, url);

            xhr.responseType = 'json'

            xhr.onload = () => {
                if(xhr.status >= 400) {
                    reject(xhr.response)
                } else {
                    resolve(xhr.response)
                }      
            }

            xhr.onerror = () => {
                reject(xhr.response)
            }

            xhr.send()
        }

        
    })
}