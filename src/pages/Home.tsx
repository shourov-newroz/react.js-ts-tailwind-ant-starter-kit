import { Button, Card, Space, Typography } from 'antd';
import StyleTest from '../components/StyleTest';
import ThemeTest from '../components/ThemeTest';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div className="p-8">
      <Card className="max-w-2xl mx-auto mb-8">
        <Space direction="vertical" size="large" className="w-full">
          <Title level={2}>Welcome to SportsRoz</Title>
          <Paragraph>
            This is a sample page demonstrating the integration of Ant Design components. The
            layout, typography, buttons, and cards are all from Ant Design's component library.
          </Paragraph>
          <Space>
            <Button type="primary">Get Started</Button>
            <Button>Learn More</Button>
          </Space>
        </Space>
      </Card>

      <StyleTest />
      <ThemeTest />
    </div>
  );
};

export default Home;
