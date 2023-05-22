import { getDocs } from "firebase/firestore";
import { getLike } from "../src/js/firebase/like.js"
jest.mock('firebase/firestore');

describe('getLike', () => {
    test('deve retornar true caso o usuário tenha curtido', () => {
        getDocs.mockReturnValue({ empty: false, docs: [true] })
        const userId = 1234;
        const postId = 5678;

        const isLiked = getLike(postId, userId)

        expect(isLiked).toEqual(true);
    });

});