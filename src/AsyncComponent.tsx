import { useState, useEffect } from 'react';

interface posts{
  "userId": number,
  "id": number,
  "title": string,
  "body": string
}

const AsyncComponent = () => {
  const [data, setData] = useState<posts[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const jsonData = await response.json();
        setData(jsonData);
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
