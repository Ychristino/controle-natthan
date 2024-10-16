import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputMask from 'react-input-mask'; // Importação da biblioteca de máscara
import ClientFormData from '../../content/pageData/clientFormData';

const CadastroPessoa = () => {
    const [pageData, setPageData] = useState(ClientFormData["pt-br"]);
    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        idNumber: '',
        email: '',
        phone: '',
        zipCode: '',
        country: '',
        state: '',
        city: '',
        adress: '',
        resNumber: null,
        adressCompl: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Se o campo for idNumber, removemos os separadores ao salvar
        let formattedValue;
        formattedValue = name === 'idNumber' ? value.replace(/[.-_]/g, '') : value;
        formattedValue = name === 'phone' ? value.replace(/[.-_]/g, '') : value;
        formattedValue = name === 'zipCode' ? value.replace(/[.-_]/g, '') : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: formattedValue,
        }));
        console.log(formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar os dados para um backend ou realizar outra ação.
        console.log(formData);
    };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">{pageData.registerTitle}</h2>
        <form onSubmit={handleSubmit}>
            <div className="row mb-3">
                <div className="col-12">
                    <label className="form-label">{pageData.labelName}</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} placeholder={pageData.inputnamePlaceholder} required />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">{pageData.labelIdNumber}</label>
                    <InputMask
                        mask={pageData.inputIdNumberMask}
                        value={formData.idNumber}
                        onChange={handleChange}
                    >
                        {(inputProps) => <input {...inputProps} type="text" name="idNumber" className="form-control" placeholder={pageData.inputIdNumberPlaceholder} required />}
                    </InputMask>
                </div>
                <div className="col-md-6">
                    <label className="form-label">{pageData.labelBirthDate}</label>
                    <input type="date" name="birthDate" className="form-control" value={formData.birthDate} onChange={handleChange} required />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">{pageData.labelEmail}</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} placeholder={pageData.inputEmailPlaceholder} required />
                </div>
                
                <div className="col-md-6">
                    <label className="form-label">{pageData.labelPhone}</label>
                    <InputMask
                        mask={pageData.inputPhoneMask}
                        value={formData.phone}
                        onChange={handleChange}
                    >
                        {(inputProps) => <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} placeholder={pageData.inputPhonePlaceholder} required />}
                    </InputMask>
                </div>
            </div>

            <h3 className="text-center mt-4 mb-3">{pageData.adressTitle}</h3>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">{pageData.labelZipCode}</label>
                    <InputMask
                        mask={pageData.inputZipCodeMask}
                        value={formData.zipCode}
                        onChange={handleChange}
                    >
                        {(inputProps) => <input type="text" name="zipCode" className="form-control" value={formData.zipCode} onChange={handleChange} placeholder={pageData.inputZipCodePlaceholder} required />}
                    </InputMask>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">{pageData.labelCountry}</label>
                    <input type="text" name="country" className="form-control" value={formData.country} onChange={handleChange} placeholder={pageData.inputCountryPlaceholder} required />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">{pageData.labelState}</label>
                    <input type="text" name="state" className="form-control" value={formData.state} onChange={handleChange} placeholder={pageData.inputStatePlaceholder} required />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">{pageData.labelCity}</label>
                    <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} placeholder={pageData.inputCityPlaceholder} required />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">{pageData.labelAdress}</label>
                    <input type="text" name="adress" className="form-control" value={formData.adress} onChange={handleChange} placeholder={pageData.inputAdressPlaceholder} required />
                </div>

                <div className="col-md-2 mb-3">
                        <label className="form-label">{pageData.labelResNumber}</label>
                        <input type="text" name="resNumber" className="form-control" value={formData.resNumber} onChange={handleChange} placeholder={pageData.inputResNumberPlaceholder} required />
                </div>
            </div>
            
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">{pageData.labelAdressCompl}</label>
                    <input type="text" name="adressCompl" className="form-control" value={formData.adressCompl} onChange={handleChange} placeholder={pageData.inputAdressComplPlaceholder}/>
                </div>
            </div>

          <button type="submit" className="btn btn-primary w-100">{pageData.btmRegister}</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroPessoa;
