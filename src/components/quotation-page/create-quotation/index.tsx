import COLORS from '@/constant/color';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Form } from 'antd';

// const waitTime = (time = 100) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// };
export default function CreateQuotation() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="Add new quotation"
      trigger={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{
            marginRight: '4px',
            backgroundColor: COLORS.BRIGHT,
            color: COLORS.PRIMARY,
            borderColor: COLORS.PRIMARY,
          }}
        >
          Add new quotation
        </Button>
      }
      submitter={{
        searchConfig: {
          resetText: 'Cancel',
          submitText: 'Add quotation',
        },
      }}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      // submitTimeout={2000}
      // onFinish={async (values) => {
      //   await waitTime(2000);
      //   message.success('提交成功');
      //   return true;
      // }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="NameCompany"
          label="Tên cảng mới"
          tooltip="Tên được đăng ký ở bộ giao thông vận tải"
          placeholder="Nhập tên cảng mới"
        />

        <ProFormText
          width="md"
          name="Address"
          label="Địa chỉ"
          placeholder="Nhập địa chỉ"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="NumberPhone"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
        />
        <ProFormText
          width="md"
          name="Email"
          label="Email"
          placeholder="Nhập email"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="TotalContainer"
          placeholder="Nhập số lượng container"
          label="Số lượng container"
          rules={[
            {
              // required: true,
              type: 'number',
              min: 0,
              max: 100,
              message: 'Vui lòng nhập tổng số container',
            },
          ]}
        />
        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'Hoạt động',
            },
            {
              value: '2',
              label: 'Ngừng hoạt động',
            },
          ]}
          width="md"
          name="useMode1"
          placeholder="Chọn trạng thái hoạt động"
          label="Trạng thái"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="12"
          placeholder="Nhập sức chứa"
          label="Sức chứa"
          rules={[
            {
              // required: true,
              type: 'number',
              min: 0,
              max: 100,
              message: 'Vui lòng nhập sức chứa',
            },
          ]}
        />
        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'Hoạt động',
            },
            {
              value: '2',
              label: 'Ngừng hoạt động',
            },
          ]}
          width="md"
          name="useMode"
          placeholder="Chọn trạng thái sức chứa"
          label="Trạng thái sức chứa"
        />
      </ProForm.Group>
    </ModalForm>
  );
}
