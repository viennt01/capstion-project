import COLORS from '@/constant/color';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Form } from 'antd';
import useI18n from '@/i18n/useI18N';

// const waitTime = (time = 100) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// };
export default function CreatePort() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateAddPort } = useI18n('port');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateAddPort('information_add_port')}
      trigger={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{
            marginRight: '4px',
            backgroundColor: COLORS.BRIGHT,
            color: COLORS.GREEN,
            borderColor: COLORS.GREEN,
            fontWeight: '500',
          }}
        >
          {translateCommon('button_add')}
        </Button>
      }
      submitter={{
        searchConfig: {
          resetText: 'Cancel',
          submitText: 'Add port',
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
          label={translateAddPort('new_port_title')}
          tooltip={translateAddPort('new_port_tooltip')}
          placeholder={translateAddPort('new_port_placeholder')}
        />

        <ProFormText
          width="md"
          name="Address"
          label={translateAddPort('address')}
          placeholder={translateAddPort('address_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="TotalContainer"
          label={translateAddPort('quantity_container')}
          placeholder={translateAddPort('quantity_container_placeholder')}
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
        <ProFormText
          width="md"
          name="Capacity"
          label={translateAddPort('capacity')}
          placeholder={translateAddPort('capacity_placeholder')}
          rules={[
            {
              // required: true,
              type: 'number',
              min: 0,
              max: 100,
              message: 'Vui lòng nhập sức chứa của cảng',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="Company"
          label={translateAddPort('company')}
          placeholder={translateAddPort('company_placeholder')}
        />
        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'Đầy',
            },
            {
              value: '2',
              label: 'Nửa đầy',
            },
          ]}
          width="md"
          name="CapacityLabel"
          label={translateAddPort('status_capacity')}
          placeholder={translateAddPort('status_capacity_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
