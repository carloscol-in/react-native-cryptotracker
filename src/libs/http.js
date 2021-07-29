
class Http {
    static instance = new Http();

    get = async (url) => {
        try {
            let req = await fetch(url);

            let json = await req.json();

            return json;
        } catch(err) {
            console.log("Http get mmethod error: ", err);

            throw Error(err);
        }
    }

    post = async (url, body) => {
        try {
            let req = await fetch(url, {
                method: "POST",
                body,
            });

            let json = await req.json();

            return json;
        } catch(err) {
            console.log("Http post method error: ", err);

            throw Error(err);
        }
    }

    put = async (url, body, id) => {
        try {
            let req = await fetch(`${url}/${id}`, {
                method: "PUT",
                body
            });

            let json = await req.json();

            return json;
        } catch (err) {
            console.log("Http put method error: ", err);

            throw Error(err);
        }
    }

    remove = async (url, id) => {
        try {
            let req = await fetch(`${url}/${id}`, {
                method: "DELETE",
                body
            });

            let json = await req.json();

            return json;
        } catch (err) {
            console.log("Http delete method error: ", err);

            throw Error(err);
        }
    }
}

export default Http;