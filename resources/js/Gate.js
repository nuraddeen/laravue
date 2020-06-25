export default class Gate {
        
        constructor (user) {
            this.authUser = user
        }
        
        
        isAdmin() {
           return this.authUser.type === 'admin'
        }
        isAuthor() {
           return this.authUser.type === 'author'
        }
        
        isUser() {
           return this.authUser.type === 'user'
        }
}

