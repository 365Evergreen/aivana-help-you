
import React, { useState } from 'react';
import * as AllComponents from './components';
import styles from './AdminComponents.module.css'; // Assuming this file exists and is correct

const layoutTemplates = [
  {
    name: 'Single Column',
    render: (children: React.ReactNode) => <div className={styles.singleColumn}>{children}</div>
  },
  {
    name: 'Two Column',
    render: (children: React.ReactNode) => (
      <div className={styles.twoColumn}>
        <div className={styles.twoColumnMain}>{children}</div>
        <div className={styles.twoColumnSidebar}>Sidebar/Preview</div>
      </div>
    ),
  },
  {
    name: 'Centered Card',
    render: (children: React.ReactNode) => (
      <div className={styles.centeredCardWrap}>
        <div className={styles.centeredCard}>{children}</div>
      </div>
    ),
  },
];

// In a real-world scenario, this would likely come from a separate metadata file
// or be generated automatically. For this example, we'll define it here.
const mockProps: { [key: string]: Record<string, any> } = {
  Button: {
    variant: 'default',
    size: 'default',
    children: 'Button',
    disabled: false,
  },
  Input: {
    type: 'text',
    placeholder: 'Enter something...',
    disabled: false,
  },
  Checkbox: {
    checked: true,
  },
  Switch: {
    checked: false,
  },
  Progress: {
    value: 33,
  },
  Badge: {
    variant: 'default',
    children: 'Badge',
  },
  Alert: {
    // The children for Alert are complex JSX, so we won't make them editable in this simple setup.
  },
};

export default function AdminComponents() {
  const componentNames = React.useMemo(
    () =>
      Object.keys(AllComponents)
        .filter((name) => {
          const C = AllComponents[name as keyof typeof AllComponents];
          // A simple check for a valid React component (a function that starts with an uppercase letter)
          return typeof C === 'function' && /^[A-Z]/.test(name);
        })
        .sort(),
    [],
  );

  const [selected, setSelected] = useState<string>(componentNames[0] || '');
  const [layout, setLayout] = useState<number>(0);
  const [props, setProps] = useState<Record<string, any>>({});
  const Component = selected ? AllComponents[selected as keyof typeof AllComponents] : null;

  React.useEffect(() => {
    setProps(mockProps[selected] || {});
  }, [selected]);

  const handlePropChange = (propName: string, value: string | boolean | number) => {
    // When updating, we check the original mock prop to maintain the correct type.
    const originalValue = (mockProps[selected] || {})[propName];
    let newValue: any = value;
    if (typeof originalValue === 'number') {
      newValue = Number(value);
      if (isNaN(newValue)) newValue = 0;
    }
    setProps((currentProps: Record<string, any>) => ({
      ...currentProps,
      [propName]: newValue,
    }));
  };

  const renderPropInput = (propName: string, propValue: any) => {
    const type = typeof propValue;

    if (type === 'boolean') {
      return (
        <input type="checkbox" id={`prop-${propName}`} checked={propValue} onChange={(e) => handlePropChange(propName, e.target.checked)} />
      );
    }

    if (type === 'number') {
      return (
        <input type="number" id={`prop-${propName}`} value={propValue} onChange={(e) => handlePropChange(propName, e.target.value)} className={styles.adminInput} />
      );
    }

    if (type === 'string') {
      return <input type="text" id={`prop-${propName}`} value={propValue} onChange={(e) => handlePropChange(propName, e.target.value)} className={styles.adminInput} />;
    }

    // For complex props (objects, arrays, elements), show a read-only view.
    return <input type="text" disabled value={JSON.stringify(propValue)} className={styles.adminInput} title="Complex props are not editable in this demo." />;
  };

  return (
    <div className={styles.adminRoot}>
      <h1>Admin: Component Library</h1>
      <div className={styles.adminFlex}>
        <aside className={styles.adminAside}>
          <h3>Components</h3>
          <ul className={styles.adminList}>
            {componentNames.map((name) => (
              <li key={name}>
                <button
                  className={`${styles.adminButton}${name === selected ? ` ${styles.adminButtonSelected}` : ''}`}
                  onClick={() => setSelected(name)}
                  aria-current={name === selected}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
          <h3>Layout</h3>
            <label htmlFor="layoutSelect" className={styles.adminLabel}>Choose layout:</label>
          <select id="layoutSelect" title="Choose layout template" value={layout} onChange={e => setLayout(Number(e.target.value))}>
            {layoutTemplates.map((tpl, i) => (
              <option key={tpl.name} value={i}>{tpl.name}</option>
            ))}
          </select>
          <div className={styles.propsEditor}>
            <h3>Properties</h3>
            {Object.keys(props).length > 0 ? (
              Object.entries(props).map(([propName, propValue]) => (
                <div key={propName} className={styles.propControl}>
                  <label htmlFor={`prop-${propName}`} className={styles.adminLabel}>
                    {propName}
                  </label>
                  {renderPropInput(propName, propValue)}
                </div>
              ))
            ) : (
              <em className={styles.adminGray}>No editable properties.</em>
            )}
          </div>
        </aside>
        <main className={styles.adminMain}>
          <h2>Preview</h2>
          <div className={styles.adminPreview}>
            {Component
              ? layoutTemplates[layout].render(<Component {...props} />)
              : <em>Select a component</em>}
          </div>
        </main>
      </div>
    </div>
  );
}
