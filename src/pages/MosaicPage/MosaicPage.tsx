import React, { useState, useEffect } from 'react';
// styles
import './Mosaic.scss';
// components
import { Layout } from '../../layouts/Layout';
import { Card } from '../../components/Card/Card';
import { Spinner } from '../../components/Spinner/Spinner';
import { Title } from '../../components/Title/Title';
import { Button } from '../../components/Button/Button';
// api
import { getPhotos } from '../../api';
// react query
import { useQuery } from 'react-query';
// types
import { ImageProps } from '../../types/types';

export const MosaicPage: React.FC = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [page, setPage] = useState(1);

  const { isLoading, error, data, refetch } = useQuery(
    ['photos', page],
    () => getPhotos(page),
    { enabled: true },
  );

  useEffect(() => {
    data && setImages([...data]);
  }, [data]);

  const handleLoadMore = () => {
    setPage((prevstate) => prevstate + 1);
    refetch();
  };

  if (isLoading) return <Spinner />;
  {
    error instanceof Error && <p>{error.message}</p>;
  }

  return (
    <Layout>
      {images.length > 0 ? (
        images.map((image) => (
          <Card
            key={image.id}
            src={image?.urls?.small}
            alt={image.alt_description}
            subtitle={image?.user?.first_name}
            description={image.alt_description}
          />
        ))
      ) : (
        <Spinner />
      )}
      <div className="title">
        <Title text={'Connect people & spaces'} />
      </div>
      <div className="load">
        <Button onClick={handleLoadMore} />
      </div>
    </Layout>
  );
};
