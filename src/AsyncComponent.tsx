import { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const AsyncComponent = () => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Async Component</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AsyncComponent;
