const authProvider = {
    login: ({ username, password }) =>  {
        
        var token = window.btoa(username + ':' + password);
        sessionStorage.setItem('token',token);
        const request = new Request("https://nominaapi202102.azurewebsites.net/Autenticar", {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json',
            "Access-Control-Allow-Headers": "Authorization",
            "Access-Control-Allow-Methods": "GET, POST, DELETE","Access-Control-Allow-Origin": "*",  'Authorization' : 'Basic ' + token }),
        });
        return fetch(request)
            .then(response => {
                
                if (response.status > 200 && response.status < 401) {
                    throw new Error(response.statusText);
                }
                if(response.status === 401){
                    throw new Error('Usuario o contraseña incorrecta');
                }
                /*
                response.json().then((identity)=>{
                    sessionStorage.setItem('id',identity['id']);
                    sessionStorage.setItem('Usuario',identity['Usuario']);
                    sessionStorage.setItem('Roles',identity['Roles']);
                    sessionStorage.setItem('Email',identity['Email']);
                    sessionStorage.setItem('Nombre',identity['Nombre']);
                    sessionStorage.setItem('Apellido',identity['Apellido']);
                });
                */
                return response.json().then(
                    (json) => {return Promise.resolve(json)}
                )
            })
            .then((identity) => {
                console.log(identity);
                sessionStorage.setItem('id',identity['id']);
                sessionStorage.setItem('Usuario',identity['Usuario']);
                sessionStorage.setItem('Roles',identity['Roles']);
                sessionStorage.setItem('Email',identity['Email']);
                sessionStorage.setItem('Nombre',identity['Nombre']);
                sessionStorage.setItem('Apellido',identity['Apellido']);
                sessionStorage.setItem('auth', 'true');
                return Promise.resolve();
            })
            .catch((error) => {
                console.error(error);
                throw new Error(error);
            });
    },
    logout: () => {
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('Roles');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('Roles');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getIdentity:() =>{
        const id = sessionStorage.getItem('id') ? sessionStorage.getItem('id') : 0;
        const fullName = sessionStorage.getItem('Nombre') ? sessionStorage.getItem('Nombre') + " " + sessionStorage.getItem('Apellido') : "";
        return Promise.resolve({ id, fullName });
    },
    checkAuth: () => {
        return sessionStorage.getItem('auth') === 'true'
        ? Promise.resolve()
        : Promise.reject()

    },
    getPermissions: () => {
        
        const roles = sessionStorage.getItem('Roles')? sessionStorage.getItem('Roles').split(",") : "";
        console.log(roles);
        return roles ? Promise.resolve(roles) : Promise.reject();
    }
};

export default authProvider;