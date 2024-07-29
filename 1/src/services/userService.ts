import axios from 'axios';
import { User } from '../models/userModel';
import fs from 'fs';
import path from 'path';
import { USERS_PATH } from '../constants/consts';

const filePath = path.resolve(__dirname, '../../data/users.json');

class UserService {
    static saveUserToJson(user: User | undefined): void {
        if (user && user.name.startsWith('E')) {
            let users: User[] = [];

            if (fs.existsSync(filePath)) {
                const fileData = fs.readFileSync(filePath, 'utf-8');
                users = JSON.parse(fileData);
            }

            users.push(user);

            fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
        }
    }


    static async getUserByName(userName: string): Promise<User | undefined> {
        const response = await axios.get<User[]>(USERS_PATH);
        const users = response.data;
        const userToReturn = users.find(user => user.name === userName) || undefined;
        return userToReturn;
    }
    
    static async getAllUsers(): Promise<User[] | undefined> {
        const res = await axios.get<User[]>(USERS_PATH);
        return res.data
    }
}

export default UserService;
