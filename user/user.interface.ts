
interface User{
    _id:string,
    email:string,
    phone:string,
    address?:{
        street:string,
        city:string
    }
}

export default User;

