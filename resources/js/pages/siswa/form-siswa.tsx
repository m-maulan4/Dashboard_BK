import { useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import siswa from '@/routes/siswa';
import type { dataSiswaType, siswaAPI } from '@/types';
const daftarAgama = [
    { value: 'islam', title: 'Islam' },
    { value: 'kristen', title: 'Kristen' },
    { value: 'katolik', title: 'Katolik' },
    { value: 'hindu', title: 'Hindu' },
    { value: 'buddha', title: 'Buddha' },
    { value: 'konghucu', title: 'Konghucu' },
];
const daftarStatusSiswa = [
    { value: 'aktif', title: 'Aktif' },
    { value: 'nonaktif', title: 'Nonaktif' },
    { value: 'lulus', title: 'Lulus' },
    { value: 'pindah', title: 'Pindah' },
];
type FormSiswaProps = {
    type: 'update' | 'create';
    dataSiswa?: dataSiswaType;
    closeDialog: () => void;
};
export default function FormSiswa({
    type,
    dataSiswa,
    closeDialog,
}: FormSiswaProps) {
    const dataAPI = usePage<{ data: siswaAPI }>().props.data;
    const { data, setData, post, reset, processing, errors } = useForm({
        nama: dataSiswa?.nama ?? '',
        nama_panggilan: dataSiswa?.nama_panggilan ?? '',
        agama: dataSiswa?.agama ?? '',
        jk: dataSiswa?.jk ? String(dataSiswa?.jk) : '',
        kelas: dataSiswa?.kode_kelas ?? '',
        no_orangtua: dataSiswa?.no_orangtua ?? '',
        alamat: dataSiswa?.alamat ?? '',
        status: dataSiswa?.status ?? '',
    });
    const handleSubmit = () => {
        if (type === 'create') {
            post(siswa.store().url, {
                onSuccess: () => {
                    reset();
                    closeDialog();
                },
            });
        } else {
            post(siswa.update(dataSiswa?.kode_siswa ?? '-').url, {
                onSuccess: () => {
                    reset();
                    closeDialog();
                },
            });
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <FieldGroup>
                <Field>
                    <FieldLabel>Nama</FieldLabel>
                    {errors.nama && <FieldError>{errors.nama}</FieldError>}
                    <Input
                        value={data.nama}
                        onChange={(e) => setData('nama', e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel>Nama Panggilan</FieldLabel>
                    {errors.nama_panggilan && (
                        <FieldError>{errors.nama_panggilan}</FieldError>
                    )}
                    <Input
                        value={data.nama_panggilan}
                        onChange={(e) =>
                            setData('nama_panggilan', e.target.value)
                        }
                    />
                </Field>
                <Field>
                    <FieldLabel>Agama</FieldLabel>
                    {errors.agama && <FieldError>{errors.agama}</FieldError>}
                    <Select
                        value={data.agama}
                        onValueChange={(e) => setData('agama', e)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Agama" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {daftarAgama.map((item) => (
                                    <SelectItem
                                        value={item.value}
                                        key={item.value}
                                    >
                                        {item.title}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
                <Field>
                    <FieldLabel>Jenis Kelamin</FieldLabel>
                    {errors.jk && <FieldError>{errors.jk}</FieldError>}
                    <Select
                        value={data.jk}
                        onValueChange={(e) => setData('jk', e)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Jenis Kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="1">Laki-laki</SelectItem>
                                <SelectItem value="2">Perempuann</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
                <Field>
                    <FieldLabel>Kelas</FieldLabel>
                    {errors.kelas && <FieldError>{errors.kelas}</FieldError>}
                    <Select
                        value={data.kelas}
                        onValueChange={(e) => setData('kelas', e)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Kelas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {dataAPI.DKelas.map((item) => (
                                    <SelectItem
                                        value={item.kode_kelas}
                                        key={item.kode_kelas}
                                    >
                                        {item.kelas}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
                <Field>
                    <FieldLabel>No Orang Tua</FieldLabel>
                    {errors.no_orangtua && (
                        <FieldError>{errors.no_orangtua}</FieldError>
                    )}
                    <Input
                        value={data.no_orangtua}
                        onChange={(e) => setData('no_orangtua', e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel>Alamat</FieldLabel>
                    {errors.alamat && <FieldError>{errors.alamat}</FieldError>}
                    <Textarea
                        value={data.alamat}
                        onChange={(e) => setData('alamat', e.target.value)}
                    />
                </Field>
                {type === 'update' && (
                    <Field>
                        <FieldLabel>Status</FieldLabel>
                        {errors.status && (
                            <FieldError>{errors.status}</FieldError>
                        )}
                        <Select
                            value={data.status}
                            onValueChange={(e) => setData('status', e)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {daftarStatusSiswa.map((item) => (
                                        <SelectItem
                                            value={item.value}
                                            key={item.value}
                                        >
                                            {item.title}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                )}
                <div className="mt-6 flex items-center justify-end space-x-2">
                    <Button variant="destructive" onClick={() => closeDialog()}>
                        Cancle
                    </Button>
                    <Button type="submit" disabled={processing}>
                        Submit
                    </Button>
                </div>
            </FieldGroup>
        </form>
    );
}
