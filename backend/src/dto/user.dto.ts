interface Userdto{
    fname: string;
    sname: string;
    email: string;
    phonenumber: string;
    birthday: Date;
    department: string;
    password: string
}

interface UpdateUserdto {
    email?: string;
    fname?: string;
    sname?: string;
    phonenumber?: string;
    department?: string;
    imageUri?: string;
    password?: string;
}