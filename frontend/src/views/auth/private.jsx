// import { useEffect, useState } from 'react';
// import useAxios from '../../utils/useAxios';

// const Private = () => {
//     const [res, setRes] = useState('');
//     const [posRes, setPostRes] = useState('');
//     const api = useAxios();
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await api.get('user/test/');
//                 setRes(response.data.response);
//             } catch (error) {
//                 setPostRes(error.response.data);
//             }
//         };
//         fetchData();
//     }, []);
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await api.post('user/test/', {
//                 text: e.target[0].value,
//             });
//             setPostRes(response.data.response);
//         } catch (error) {
//             setPostRes(error.response.data);
//         }
//     };
//     return (
//         <section>
//             <h1>Private</h1>
//             <p>{res}</p>
//             <form method="POST" onSubmit={handleSubmit}>
//                 <input type="text" placeholder="Enter Text" />
//                 <button type="submit">Submit</button>
//             </form>
//             {posRes && <p>{posRes}</p>}
//         </section>
//     );
// };

// export default Private;


import { useEffect, useState } from 'react';
import useAxios from '../../utils/useAxios';

const Private = () => {
    const [res, setRes] = useState('');
    const [posRes, setPostRes] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const api = useAxios();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('user/test/');
                setRes(response.data.response);
            } catch (error) {
                setPostRes(error.response?.data || 'An error occurred');
            }
        };
        fetchData();
    }, [api]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post('user/test/', { text: inputValue });
            setPostRes(response.data.response);
        } catch (error) {
            setPostRes(error.response?.data || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section>
            <h1>Private</h1>
            <p>{res}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {posRes && <p>{typeof posRes === 'string' ? posRes : JSON.stringify(posRes)}</p>}
        </section>
    );
};

export default Private;
