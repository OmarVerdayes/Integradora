const protectedRoute = (user,{children}) =>{
    if(!user) {

        return children
    }
}