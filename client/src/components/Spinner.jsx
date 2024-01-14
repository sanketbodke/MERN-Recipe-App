import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const App = () => (
    <Spin
        indicator={
            <LoadingOutlined
                style={{
                    fontSize: 24,
                    color: "#ffffff"
                }}
                spin
            />
        }
    />
);
export default App;