  import React, { useContext, useState } from 'react';
  import { Layout, Button, theme } from 'antd';
  import {EmployeeList} from './pages/EmployeeList';
  import EmployeeModal from './components/antdesign/EmployeeModal';
  import LeafletMap from './components/LeafletMap';
  import AddEmployee from './components/form/AddEmployee';
  import Analysis from './components/Analysis';
  import { FormattedMessage } from 'react-intl';
  import { LangContext } from './providers/languageProvider';


  const { Header, Content, Footer } = Layout;

  const items = [
    { key: 'home', label: <FormattedMessage id="home"/> },
    { key: 'map', label: <FormattedMessage id="map"/> },
    { key: 'analysis', label:<FormattedMessage id="analysis"/> },
  ];

  const App: React.FC = () => {
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [selectedNavItem, setSelectedNavItem] = useState(items[0].key);

    const handleButtonClick = (key: string) => {
      setSelectedNavItem(key);
    };

    const {setLocale} = useContext(LangContext)

    // Render different content based on selected navigation item
    const renderContent = () => {
      switch (selectedNavItem) {
        case 'home':
          return <EmployeeList />;
        case 'map':
          return <LeafletMap />;
        case "analysis":
          return <Analysis />
        default:
          return <EmployeeList />; // Default to EmployeeList if no match
      }
    };

    return (
      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="demo-logo" />
          <div style={{ flex: 1, display: 'flex', }}>
            {items.map(item => (
              <Button 
              style={{
                marginLeft:'16px'
              }}
                key={item.key}
                type={selectedNavItem === item.key ? 'primary' : 'default'}
                onClick={() => handleButtonClick(item.key)}
              >
                {item.label}
              </Button>
            ))}
            <AddEmployee />

            <select className='absolute right-3 p-1 text-green-900' onChange={e=>setLocale(e.target.value)}>
          <option value="en">English</option>
          <option value="ja">Japnese</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="zh">Chinese</option>
          <option value="de">German</option>
        </select>
          </div>
        </Header>
        <Content style={{ margin:'0' }}>
          <div
            style={{
              padding: "0",
              minHeight: 380,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
        
        </Footer>
      </Layout>
    );
  };

  export default App;
