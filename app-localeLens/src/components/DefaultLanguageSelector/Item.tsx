import { Button } from '@sanity/ui';
import { useApp } from '../../contexts/AppContext';

const Item = (props: any) => {
  const { defaultLanguage, setDefaultLanguage } = useApp();

  return (
    <Button
      text={props.id}
      onClick={() => setDefaultLanguage(props?.id)}
      mode={defaultLanguage === props?.id ? 'default' : 'ghost'}
    />
  );
};

export default Item;
