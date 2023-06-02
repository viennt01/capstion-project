import React from 'react';
import { Badge, Card, Descriptions } from 'antd';
import useI18n from '@/i18n/useI18N';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from '@ant-design/icons';

export default function EditDepot() {
  const { translate: translateDepot } = useI18n('depot');

  return (
    <Card bordered={false} style={{ margin: '10px 0' }}>
      <Descriptions title={translateDepot('information_depot')} column={2}>
        <Descriptions.Item label={<UserOutlined />}>
          Công ty Cảng quốc tế SP-PSA
        </Descriptions.Item>
        <Descriptions.Item label={<MailOutlined />}>
          thanhviennguyen01@gmail.com
        </Descriptions.Item>
        <Descriptions.Item label={<PhoneOutlined />}>
          1810000000
        </Descriptions.Item>
        <Descriptions.Item label={<HomeOutlined />}>
          Thành phố Hồ Chí Minh
        </Descriptions.Item>
      </Descriptions>
      <hr style={{ width: '70%', marginBottom: '24px' }} color="#BBBBBB" />

      <Descriptions column={2}>
        <Descriptions.Item label={translateDepot('quantity_container')}>
          100.000.000{' '}
        </Descriptions.Item>
        <Descriptions.Item label={translateDepot('capacity_label')}>
          181
        </Descriptions.Item>
        <Descriptions.Item label={translateDepot('status')}>
          <Badge status="processing" text="Hoạt động bình thường" />
        </Descriptions.Item>
        <Descriptions.Item label={translateDepot('status_capacity')}>
          <Badge status="error" text="Đầy" />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
