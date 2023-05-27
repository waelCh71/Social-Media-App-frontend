export interface User {
    id: string,
    firstname: string,
    lastname: string,
    fullName: string,
    email: string,
    //TODO Change
    //password: string,
    dob: string,
    country: string,
    phoneNumber: string,
    city: string,
    bio: string,
    userStatut: string,
    profileState: string,
    
    profile_pic_url:string;

    cover_pic_url: string;

     userInterests:Array<string>;

    createdDate: string;


     role: string;

     gender:string;
    
}