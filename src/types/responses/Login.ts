export type User = {
    id: string;
    kode: string;
    nama: string;
    kontak: string;
    username: string;
    alamat: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type LoginPost = {
  username: string;
  password: string;
};
