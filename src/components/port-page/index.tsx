import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider, Input, InputRef, Space, Tag } from 'antd';
import { Key, useEffect, useRef, useState } from 'react';
import CreatePort from './create-port';
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

const STATUS_CAPACITY_COLORS = {
  Full: '#31AFFE',
  NotFull: '#616887',
};

const STATUS_CAPACITY_LABELS = {
  Full: 'Đầy',
  NotFull: 'Nửa đầy',
};

export default function PortPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translatePort } = useI18n('port');
  const { translate: translateCommon } = useI18n('common');
  const [locale, setLocale] = useState(enUS);
  interface DataType {
    key: number;
    countryCode: string;
    countryName: string;
    portCode: string;
    portName: string;
    address: string;
    totalContainer: number;
    capacityState: string;
    companyName: string;
    status: string;
    dateCreated: string;
    creator: string;
  }

  const data: DataType[] = [];

  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      countryCode: 'VN',
      countryName: 'Vietnam',
      portCode: i % 2 === 0 ? 'TCCL' : 'TCPH',
      portName: i % 2 === 0 ? 'Cảng Cát Lái' : 'Cảng tân cảng Phú Hữu',
      address:
        i % 2 === 0
          ? '1295B Đường Nguyễn Thị Định, Phường Cát Lái, Quận 2, TP Hồ Chí Minh, Việt Nam'
          : 'Khu phố 04, Phường Phú Hữu, Quận 9, TP Hồ Chí Minh',
      totalContainer: i % 2 === 0 ? 1000000 : 5000,
      capacityState: i % 2 === 0 ? 'Full' : 'NotFull',
      companyName:
        i % 2 === 0
          ? 'Công ty Tân Cảng Sài Gòn'
          : 'Công ty TNHH MTV Cảng Bến Nghé',
      status: i % 2 === 1 ? 'Active' : 'DeActive',
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
      title: translatePort('port_no'),
      width: 100,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
      // onHeaderCell: (column) => {
      //   const colw = this.state.columnWidth;
      //   return {
      //     onMouseDown: (e) => {
      //       this.mouseDownX = e.clientX;
      //       this.beginDrag = true;
      //     },
      //     onMouseUp: () => {
      //       this.beginDrag = false;
      //     },
      //     onMouseMove: (e) => {
      //       if (this.beginDrag === true) {
      //         this.updateColumnWidth(
      //           colw + Math.round((e.clientX - this.mouseDownX) * 0.05)
      //         );
      //       }
      //     },
      //   };
      // },
    },
    {
      title: translatePort('code'),
      dataIndex: 'portCode',
      width: 120,
      key: 'portCode',
      align: 'center',
      ...getColumnSearchProps('portCode'),
    },
    {
      title: translatePort('name'),
      dataIndex: 'portName',
      width: 250,
      key: 'portName',
      align: 'center',
      ...getColumnSearchProps('portName'),
    },
    {
      title: translatePort('country_name'),
      width: 150,
      dataIndex: 'countryName',
      key: 'countryName',
      align: 'center',
      ...getColumnSearchProps('countryName'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translatePort('address'),
      dataIndex: 'address',
      width: 500,
      key: 'address',
      align: 'center',
      ...getColumnSearchProps('address'),
    },
    {
      title: translatePort('quantity'),
      width: 200,
      dataIndex: 'totalContainer',
      key: 'totalContainer',
      align: 'center',
      sorter: (a, b) => a.totalContainer - b.totalContainer,
      ...getColumnSearchProps('totalContainer'),
      ellipsis: true,
    },
    {
      title: translatePort('status_capacity'),
      width: 200,
      dataIndex: 'capacityState',
      key: 'capacityState',
      align: 'center',
      render: (value) => (
        <Tag
          color={
            STATUS_CAPACITY_COLORS[value as keyof typeof STATUS_CAPACITY_COLORS]
          }
          style={{
            margin: 0,
          }}
        >
          {STATUS_CAPACITY_LABELS[value as keyof typeof STATUS_CAPACITY_LABELS]}
        </Tag>
      ),
    },
    {
      title: translatePort('company'),
      dataIndex: 'companyName',
      key: 'companyName',
      align: 'center',
    },
    {
      title: translatePort('status'),
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 120,
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
      title: translatePort('date_created'),
      width: 100,
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      align: 'center',
    },
    {
      title: translatePort('creator'),
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
    router.push(ROUTERS.PORT_EDIT(id));
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
        headerTitle={translatePort('title')}
        scroll={{
          x: 'max-content',
        }}
        sticky={{ offsetHeader: 0 }}
        options={{
          fullScreen: true,
          search: true,
        }}
        toolBarRender={() => [
          <CreatePort key={'create'} />,
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
