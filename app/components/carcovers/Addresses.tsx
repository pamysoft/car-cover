import { useFetcher, useOutletContext } from "@remix-run/react";
import { CustomerFragment } from "customer-accountapi.generated";
import { useRef, useState } from "react";
import CheckboxField from "~/components/carcovers/CheckboxField";
import AddIcon from "~/components/carcovers/icons/AddIcon";
import EditIcon from "~/components/carcovers/icons/EditIcon";
import Modal from "~/components/carcovers/Modal";
import SelectField from "~/components/carcovers/SelectField";
import TextField from "~/components/carcovers/TextField";
import { Country, State, City }  from 'country-state-city';

export function Addresses({ className }: { className?: string }) {
    const { customer } = useOutletContext<{ customer: CustomerFragment }>();
    const { defaultAddress, addresses } = customer;
    const [isLoading, setIsLoading] = useState(false)

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const fetcher = useFetcher();
    const formRef = useRef<HTMLFormElement>(null);

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleSaveAddModal = () => {

    }

    const AddAddressModal = () => {
        const [firstName, setFirstName] = useState('')
        const [lastName, setLastName] = useState('')
        const [company, setCompany] = useState('')
        const [address, setAddress] = useState('')
        const [apartment, setApartment] = useState('')
        const [city, setCity] = useState('')
        const [province, setProvince] = useState('')
        const [postcode, setPostcode] = useState('')
        const [country, setCountry] = useState('AF')

        const allCountries = Country.getAllCountries()
        const allCountryOptions = allCountries.map(country => ({label: country.name, value: country.isoCode}))

        return (
            <Modal isOpen={isAddModalOpen} onClose={handleCloseAddModal} title="Add address">
                <div className='flex flex-col gap-[20px]'>
                    <CheckboxField onChange={() => { }} id="is_default_address" name="is_default_address" checked={false} label="This is my default address" />
                    <SelectField options={allCountryOptions} value={country} id='country' name='country' onChange={(e) => setCountry(e.target.value)} label='Country/region'></SelectField>
                    <div className='grid grid-cols-1 gap-[15px] lg:grid-cols-2'>
                        <TextField value={firstName} id='first_name' name='first_name' onChange={(e) => setFirstName(e.target.value)} label='First name' placeholder='First name'></TextField>
                        <TextField value={lastName} id='last_name' name='last_name' onChange={(e) => setLastName(e.target.value)} label='Last name' placeholder='Last name'></TextField>
                    </div>
                    <TextField value={company} id='company' name='company' onChange={(e) => setCompany(e.target.value)} label='Company' placeholder='Company'></TextField>
                    <TextField value={address} id='address' name='address' onChange={(e) => setAddress(e.target.value)} label='Address' placeholder='Address'></TextField>
                    <TextField value={apartment} id='apartment' name='apartment' onChange={(e) => setApartment(e.target.value)} label='Apartment, suite, etc (optional)'></TextField>
                    <div className='flex flex-col gap-[20px] lg:grid lg:grid-cols-3'>
                        <TextField value={city} id='city' name='city' onChange={(e) => setCity(e.target.value)} label='City' placeholder='City'></TextField>
                        <TextField value={province} id='province' name='province' onChange={(e) => setProvince(e.target.value)} label='Province' placeholder='Province'></TextField>
                        <TextField value={postcode} id='postcode' name='postcode' onChange={(e) => setPostcode(e.target.value)} label='Postcode'></TextField>
                    </div>
                </div>

                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        onClick={handleCloseAddModal}
                        className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveAddModal}
                        className="rounded bg-accent px-4 py-2 text-white hover:bg-blue-600"
                    >
                        {isLoading ? 'Saving..' : 'Save'}
                    </button>
                </div>

            </Modal>
        )
    }



    return (
        <>
            <div className={className}>
                <div className='rounded-[10px] bg-white p-[21px] text-[14px]'>
                    <div className='flex items-center gap-[10px] text-[16px]'>
                        <h2><span>Addresses</span></h2>
                        <div className='ml-2 font-semibold text-primary'>
                            <button className='flex items-center gap-[5px] text-[14px]' onClick={handleOpenAddModal}>
                                <AddIcon height={12} width={12} className='text-primary' /> Add
                            </button>
                        </div>
                    </div>
                    <div className='mt-[30px] grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-4'>
                        {addresses.nodes.map((address) => (
                            <AddressItem key={address.id} address={address}></AddressItem>
                        ))}
                    </div>
                </div>
            </div>

            <AddAddressModal />
        </>
    )
}

function AddressItem({ className, address }: { className?: string, address?: any }) {
    return (
        <div className='text-[14px] after:block after:content-[""]'>
            <div className='flex items-center gap-[10px]'><span>{address.firstName} {address.lastName}</span><div>
                <button>
                    <EditIcon className='text-primary' />
                </button>
            </div></div>

            <div className='mt-[10px]'>
                {address.formatted.map((item, index) => <div key={index}>{item}<br /></div>)}
            </div>
        </div>
    )
}