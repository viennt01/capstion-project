import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider, Input, InputRef, Space, Tag } from 'antd';
import { Key, useEffect, useRef, useState } from 'react';
import CreateTypeOfContainer from './create-type-of-container';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import enUS from 'antd/lib/locale/en_US';
import vi_VN from 'antd/lib/locale/vi_VN';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import Highlighter from 'react-highlight-words';
import { FilterConfirmProps } from 'antd/es/table/interface';
import style from './index.module.scss';

const STATUS_COLORS = {
  Active: '#00A651',
  DeActive: '#ED1C27',
};

const STATUS_LABELS = {
  Active: 'Active',
  DeActive: 'Tạm ngừng',
};

// const STATUS_CAPACITY_COLORS = {
//   Full: '#31AFFE',
//   NotFull: '#616887',
// };
// const STATUS_CAPACITY_LABELS = {
//   Full: 'Đầy',
//   NotFull: 'Nửa đầy',
// };

export default function TypeOfContainerPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateTypeOfContainer } = useI18n('typeOfContainer');
  const { translate: translateCommon } = useI18n('common');
  const [locale, setLocale] = useState(enUS);

  interface DataType {
    key: number;
    typeContainerNo: string;
    name: string;
    details: string;
    teus: number;
    status: string;
    dateCreated: string;
    creator: string;
  }

  const data: DataType[] = [];

  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      typeContainerNo: i % 2 === 0 ? 'LC0014797' : 'LC0014792',
      name: i % 2 === 0 ? '40N' : '40RF',
      details: i % 2 === 0 ? 'Cont 40 nhẹ' : 'Cont 40 lạnh',
      teus: i % 2 === 0 ? 2 : 1,
      status: i % 2 === 0 ? 'Active' : 'DeActive',
      dateCreated: '14/06/2023',
      creator: 'Admin',
    });
  }

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  type DataIndex = keyof DataType;

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ProColumns<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ProColumns<DataType>[] = [
    {
      title: translateTypeOfContainer('code'),
      width: 100,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateTypeOfContainer('container_no'),
      width: 180,
      dataIndex: 'typeContainerNo',
      key: 'typeContainerNo',
      align: 'center',
      fixed: 'left',
      ...getColumnSearchProps('typeContainerNo'),
    },
    {
      title: translateTypeOfContainer('type_of_container'),
      width: 200,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      filters: [
        {
          text: '40DC',
          value: '40DC',
        },
        {
          text: '40HC',
          value: '40HC',
        },
        {
          text: '40OT',
          value: '40OT',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateTypeOfContainer('detail'),
      width: 300,
      dataIndex: 'details',
      key: 'details',
      align: 'center',
      ...getColumnSearchProps('details'),
    },
    {
      title: translateTypeOfContainer('teus'),
      width: 100,
      dataIndex: 'teus',
      key: 'teus',
      align: 'center',
      ...getColumnSearchProps('teus'),
    },
    {
      title: translateTypeOfContainer('status'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      filters: [
        {
          text: 'Active',
          value: 'Active',
        },
        {
          text: 'Tạm ngừng',
          value: 'DeActive',
        },
      ],
      // onFilter: (value: string, record) => record.address.startsWith(value),
      filterSearch: true,
      render: (value) => (
        <Tag
          color={STATUS_COLORS[value as keyof typeof STATUS_COLORS]}
          style={{
            margin: 0,
          }}
        >
          {STATUS_LABELS[value as keyof typeof STATUS_LABELS]}
        </Tag>
      ),
    },
    {
      title: translateTypeOfContainer('date_created'),
      width: 100,
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      align: 'center',
    },
    {
      title: translateTypeOfContainer('creator'),
      width: 150,
      dataIndex: 'creator',
      key: 'creator',
      align: 'center',
    },
    {
      key: 'operation',
      fixed: 'right',
      width: 50,
      align: 'center',
      dataIndex: 'key',
      render: (value) => (
        <Button
          onClick={() => handleEditCustomer(value as string)}
          icon={<EditOutlined />}
        ></Button>
      ),
    },
  ];

  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.TYPES_OF_CONTAINER_EDIT(id));
  };

  const handleSelectionChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  useEffect(() => {
    switch (appLocalStorage.get(LOCAL_STORAGE_KEYS.LANGUAGE)) {
      case 'en':
        setLocale(enUS);
        break;
      case 'vi':
        setLocale(vi_VN);
        break;
      default:
        setLocale(vi_VN);
        break;
    }
  }, [router]);

  return (
    <ConfigProvider locale={locale}>
      <ProTable<DataType>
        className={style.table}
        style={{ marginTop: '8px' }}
        rowKey="key"
        dataSource={data}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedRowKeys,
          onChange: handleSelectionChange,
        }}
        pagination={{
          position: ['bottomCenter'],
          showTotal: () => '',
          showSizeChanger: true,
        }}
        columns={columns}
        search={false}
        dateFormatter="string"
        headerTitle={translateTypeOfContainer('title')}
        scroll={{
          x: 'max-content',
        }}
        sticky={{ offsetHeader: 0 }}
        options={{
          fullScreen: true,
          search: true,
        }}
        toolBarRender={() => [
          <CreateTypeOfContainer key={'create'} />,
          <Button
            icon={<DeleteOutlined />}
            style={{
              backgroundColor: COLORS.RED,
              color: COLORS.WHITE,
              borderColor: COLORS.RED,
              fontWeight: '500',
            }}
            key={'delete'}
          >
            {translateCommon('button_delete')}
          </Button>,
        ]}
      />
    </ConfigProvider>
  );
}
