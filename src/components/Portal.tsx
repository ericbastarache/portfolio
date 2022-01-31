import React from 'react';
import ReactDOM from 'react-dom';
import Terminal from '../components/Terminal';

const Portal: React.FC<{ domNode: any }> = ({
  domNode
}) => {
  const [element, setElement] = React.useState<any>(null);
  React.useEffect(() => {
    if (!domNode?.current) return;
    setElement(domNode.current);
  }, [domNode?.current]);
  if (element)
    return ReactDOM.createPortal(<Terminal />, element); 
  else 
    return null
};

export default Portal;
