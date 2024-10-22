import { Form, useFetcher, useOutletContext } from "@remix-run/react";
import { CustomerFragment } from "customer-accountapi.generated";
import { useEffect, useRef, useState } from "react";
import CheckboxField from "~/components/common/CheckboxField";
import AddIcon from "~/components/common/icons/AddIcon";
import EditIcon from "~/components/common/icons/EditIcon";
import Modal from "~/components/common/Modal";
import SelectField from "~/components/common/SelectField";
import TextField from "~/components/common/TextField";
import { Country, State, City } from 'country-state-city';

export function Addresses({ className }: { className?: string }) {
    const { customer } = useOutletContext<{ customer: CustomerFragment }>();
    const { defaultAddress, addresses } = customer;

    return (
        <>
            <div className={className}>
                <div className='rounded-[10px] bg-white p-[21px] text-[14px]'>
                    <NewAddress />
                    <ExistingAddresses defaultAddress={defaultAddress} addresses={addresses} />
                </div>
            </div>
        </>
    )
}

function NewAddress() {
    const [isLoading, setIsLoading] = useState(false)

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const addFetcher = useFetcher();
    const formRef = useRef<HTMLFormElement>(null);
    const addressId = 'NEW_ADDRESS_ID';

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleSaveAddModal = () => {
        const formData = new FormData(formRef.current!);
        // modify formData here

        addFetcher.submit(formData, {
            method: "POST",
            action: "/account/profile/address_mutation"
        });
    }

    useEffect(() => {
        console.log('deleteFetcher.state', addFetcher.state)
        if (addFetcher.state === 'submitting') {
          setIsLoading(true)
        }
        if (addFetcher.state === 'idle' && addFetcher.data) {
            setIsAddModalOpen(false);
          const result = addFetcher.data;          
          console.log('result', result)
          setIsLoading(false);

          if (result.error && result.error[addressId]) {
            alert(result.error[addressId])
          }
        }
      }, [addFetcher.state, addFetcher.data]);

    const AddAddressModal = () => {
        const [isDefaultAddress, setIsDefaultAddress] = useState(false)
        const [firstName, setFirstName] = useState('')
        const [lastName, setLastName] = useState('')
        const [company, setCompany] = useState('')
        const [address, setAddress] = useState('')
        const [apartment, setApartment] = useState('')
        const [city, setCity] = useState('')
        const [province, setProvince] = useState('')
        const [postcode, setPostcode] = useState('')
        const [country, setCountry] = useState('CA')

        const allCountries = Country.getAllCountries()
        const allCountryOptions = allCountries.map(country => ({ label: country.name, value: country.isoCode }))
        
        const [stateOptions, setStateOptions] = useState<{label:string,value:string}[]>([])

        useEffect(() => {
            const states = State.getStatesOfCountry(country)
            const options = states.map(state => ({label: state.name, value: state.isoCode}))
            setStateOptions([...options])
        }, [country])

        return (
            <Modal isOpen={isAddModalOpen} onClose={handleCloseAddModal} title="Add address" >
                <Form className="max-w-none" onSubmit={(e)=>e.preventDefault()} method="post" action="/account/profile/add_address" ref={formRef}>
                    <input type="hidden" name="addressId" defaultValue={addressId} />
                    <div className='flex flex-col gap-[20px]'>
                        <CheckboxField onChange={(e) => { setIsDefaultAddress(e.target.checked) }} id="defaultAddress" name="defaultAddress" checked={isDefaultAddress} label="This is my default address" />
                        <SelectField options={allCountryOptions}  value={country} id='territoryCode' name='territoryCode' onChange={(e) => setCountry(e.target.value)} label='Country/region'></SelectField>
                        <div className='grid grid-cols-1 gap-[15px] lg:grid-cols-2'>
                            <TextField value={firstName} id='firstName' name='firstName' onChange={(e) => setFirstName(e.target.value)} label='First name' placeholder='First name'></TextField>
                            <TextField value={lastName} id='lastName' name='lastName' onChange={(e) => setLastName(e.target.value)} label='Last name' placeholder='Last name'></TextField>
                        </div>
                        <TextField value={company} id='company' name='company' onChange={(e) => setCompany(e.target.value)} label='Company' placeholder='Company'></TextField>
                        <TextField value={address} id='address1' name='address1' onChange={(e) => setAddress(e.target.value)} label='Address' placeholder='Address'></TextField>
                        <TextField value={apartment} id='address2' name='address2' onChange={(e) => setApartment(e.target.value)} label='Apartment, suite, etc (optional)'></TextField>
                        <div className='flex flex-col gap-[20px] lg:grid lg:grid-cols-3'>
                            <TextField value={city} id='city' name='city' onChange={(e) => setCity(e.target.value)} label='City' placeholder='City'></TextField>
                            
                            {stateOptions.length>0 && <SelectField options={stateOptions}  value={province} id='zoneCode' name='zoneCode' onChange={(e) => setProvince(e.target.value)} label='Province'></SelectField>}

                            <TextField value={postcode} id='zip' name='zip' onChange={(e) => setPostcode(e.target.value)} label='Postcode'></TextField>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handleCloseAddModal}
                            className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveAddModal}
                            className="rounded bg-accent px-4 py-2 text-white hover:bg-blue-600"
                        >
                            {isLoading ? 'Saving..' : 'Save'}
                        </button>
                    </div>
                </Form>
            </Modal>
        )
    }

    return (
        <>
            <div className='flex items-center gap-[10px] text-[16px]'>
                <h2><span>Addresses</span></h2>
                <div className='ml-2 font-semibold text-primary'>
                    <button className='flex items-center gap-[5px] text-[14px]' onClick={handleOpenAddModal}>
                        <AddIcon height={12} width={12} className='text-primary' /> Add
                    </button>
                </div>
            </div>
            <AddAddressModal />
        </>
    )
}

function ExistingAddresses({ defaultAddress, addresses }: { defaultAddress: any, addresses: any }) {
    return (
        <>{!addresses.nodes.length ? (
            <p>You have no addresses saved.</p>
        ) : (
            <div className='mt-[30px] grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-4'>
                {addresses.nodes.map((address) => (
                    <AddressItem defaultAddress={defaultAddress} key={address.id} addressId={address.id} address={address}></AddressItem>
                ))}
            </div>)}</>
    )
}

function AddressItem({ className, defaultAddress, address, addressId }: { className?: string, defaultAddress?: any, address?: any, addressId: string }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    return (
        <div className={className}>
            <div className='relative cursor-pointer text-[14px] after:absolute after:bottom-[-10px] after:left-[-10px] after:right-[-10px] after:top-[-10px] after:block after:rounded-[5px] after:opacity-30 after:content-[""] after:hover:bg-[rgba(212,212,212,0.5)]' onClick={handleOpenEditModal}>
                <div className='flex items-center justify-between gap-[10px]'>
                    <span>{(defaultAddress?.id === address.id)?'Default address':`${address.firstName} ${address.lastName}`}</span><div>
                        <button>
                            <EditIcon className='text-primary' />
                        </button>
                    </div></div>
                <div className='mt-[10px]'>
                    {address.formatted.map((item, index) => <div key={index}>{item}<br /></div>)}
                </div>
            </div>
            {<EditAddressModal isEditModalOpen={isEditModalOpen} defaultAddress={defaultAddress} onClose={handleCloseEditModal} addressInfo={address} addressId={addressId} setIsEditModalOpen={setIsEditModalOpen} />}
        </div>
    )
}

function EditAddressModal({ onClose, defaultAddress, addressInfo, addressId, isEditModalOpen, setIsEditModalOpen }: { onClose: () => void, defaultAddress: any, addressInfo: any, addressId: string, isEditModalOpen: boolean, setIsEditModalOpen: (value: boolean) => void }) {
    const [isDefaultAddress, setIsDefaultAddress] = useState(defaultAddress?.id === addressInfo.id)
    const [firstName, setFirstName] = useState(addressInfo.firstName)
    const [lastName, setLastName] = useState(addressInfo.lastName)
    const [company, setCompany] = useState(addressInfo.company)
    const [address, setAddress] = useState(addressInfo.address1)
    const [apartment, setApartment] = useState(addressInfo.address2)
    const [city, setCity] = useState(addressInfo.city)
    const [province, setProvince] = useState(addressInfo.zoneCode)
    const [postcode, setPostcode] = useState(addressInfo.zip)
    const [country, setCountry] = useState(addressInfo.territoryCode)

    const deleteFetcher = useFetcher({
        key: "delete-address-"+addressId
    });
    const formRef = useRef<HTMLFormElement>(null);
    const allCountries = Country.getAllCountries()
    const allCountryOptions = allCountries.map(country => ({ label: country.name, value: country.isoCode }))
    const [isLoading, setIsLoading] = useState(false)

    const [stateOptions, setStateOptions] = useState<{label:string,value:string}[]>([])

    useEffect(() => {
        const states = State.getStatesOfCountry(country)
        const options = states.map(state => ({label: state.name, value: state.isoCode}))
        setStateOptions([...options])
    }, [country])

    const editFetcher = useFetcher({
        key: "edit-address-"+addressId
    })

    const handleSaveEditModal = () => {
        const formData = new FormData(formRef.current!);
        // modify formData here

        editFetcher.submit(formData, {
            method: "PUT",
            action: "/account/profile/address_mutation"
        });

    }
    const handleDeleteEditModal = () => {
        deleteFetcher.submit({ addressId: addressId }, {
            method: "DELETE",
            action: "/account/profile/address_mutation"
        });
        setIsEditModalOpen(false)
    }


    useEffect(() => {
        console.log('deleteFetcher.state', deleteFetcher.state)
        if (deleteFetcher.state === 'submitting') {
          setIsLoading(true)
        }
        if (deleteFetcher.state === 'idle' && deleteFetcher.data) {
            // setIsEditModalOpen(false);
          const result = deleteFetcher.data;          
          console.log('result', result)
          setIsLoading(false);

          if (result.error && result.error[addressId]) {
            alert(result.error[addressId])
          }
        }
      }, [deleteFetcher.state, deleteFetcher.data]);

    useEffect(() => {
        console.log('editFetcher.state', editFetcher.state)
        if (editFetcher.state === 'submitting') {
          setIsLoading(true)
        }
        if (editFetcher.state === 'idle' && editFetcher.data) {
            setIsEditModalOpen(false);
          const result = editFetcher.data;          
          console.log('result', result)
          setIsLoading(false);

          if (result.error && result.error[addressId]) {
            alert(result.error[addressId])
          }
        }
      }, [editFetcher.state, editFetcher.data]);

    return (
        <>
            <Modal isOpen={isEditModalOpen} onClose={onClose} title="Edit address">
                <Form id={addressId} onSubmit={(e)=>e.preventDefault()} className="max-w-none" method="post" action="/account/profile/address_mutation" ref={formRef}>
                    <input type="hidden" name="addressId" defaultValue={addressId} />
                    <div className='flex flex-col gap-[20px]'>
                        <CheckboxField onChange={(e) => { setIsDefaultAddress(e.target.checked) }} id="defaultAddress" name="defaultAddress" checked={isDefaultAddress} label="This is my default address" />
                        <SelectField options={allCountryOptions} value={country} id='territoryCode' name='territoryCode' onChange={(e) => setCountry(e.target.value)} label='Country/region'></SelectField>
                        <div className='grid grid-cols-1 gap-[15px] lg:grid-cols-2'>
                            <TextField value={firstName} id='firstName' name='firstName' onChange={(e) => setFirstName(e.target.value)} label='First name' placeholder='First name'></TextField>
                            <TextField value={lastName} id='lastName' name='lastName' onChange={(e) => setLastName(e.target.value)} label='Last name' placeholder='Last name'></TextField>
                        </div>
                        <TextField value={company} id='company' name='company' onChange={(e) => setCompany(e.target.value)} label='Company' placeholder='Company'></TextField>
                        <TextField value={address} id='address1' name='address1' onChange={(e) => setAddress(e.target.value)} label='Address' placeholder='Address'></TextField>
                        <TextField value={apartment} id='address2' name='address2' onChange={(e) => setApartment(e.target.value)} label='Apartment, suite, etc (optional)'></TextField>
                        <div className='flex flex-col gap-[20px] lg:grid lg:grid-cols-3'>
                            <TextField value={city} id='city' name='city' onChange={(e) => setCity(e.target.value)} label='City' placeholder='City'></TextField>
                            {stateOptions.length>0 && <SelectField options={stateOptions}  value={province} id='zoneCode' name='zoneCode' onChange={(e) => setProvince(e.target.value)} label='Province'></SelectField>}
                            <TextField value={postcode} id='zip' name='zip' onChange={(e) => setPostcode(e.target.value)} label='Postcode'></TextField>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-between space-x-4">
                        <div>
                            <button
                                type="button"
                                onClick={handleDeleteEditModal}
                                className="bg-none px-0 py-2 text-primary"
                            >
                                Delete
                            </button>
                        </div>
                        <div className="flex gap-[20px]">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveEditModal}
                                className="rounded bg-accent px-4 py-2 text-white hover:bg-blue-600"
                            >
                                {isLoading ? 'Saving..' : 'Save'}
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal>
        </>
    )
}