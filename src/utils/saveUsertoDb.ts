import axios from "axios";
import { showErrorMessage, showSuccessMessage } from "./NotifyToast";

interface IRestData {
    address: string;
    gender: string;
    phone: number;
    role: string;
}

const saveUserToDb = async (
    name: string | null,
    email: string | null,
    photoURL: string | null,
    ...rest: IRestData[]
) => {
    const user = {
        name,
        email,
        img: photoURL,
        address: rest[0]?.address || null,
        gender: rest[0]?.gender || null,
        phone: rest[0]?.phone || null,
        role: rest[0]?.role || "user",
    };

    await axios
        .get(
            `https://book-finder-server-alpha.vercel.app/api/v1/users/${email}`
        )
        .then((res) => {
            if (res?.data?.email !== email) {
                axios
                    .post(
                        `https://book-finder-server-alpha.vercel.app/api/v1/users`,
                        user
                    )
                    .then((res) => {
                        if (res?.data.insertedId) {
                            showSuccessMessage(
                                "🦸 User Data Saved in Database Successfully!"
                            );
                        }
                    })
                    .catch((err) => {
                        showErrorMessage(err.message);
                    });
            }
        })
        .catch((err) => {
            showErrorMessage(err.message);
        });
};

export default saveUserToDb;
