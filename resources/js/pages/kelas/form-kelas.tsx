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
import kelas from '@/routes/kelas';
import type { dataKelasType, kelasAPI } from '@/types';
type FormKelasProps = {
    dataKelas?: dataKelasType;
    type: 'update' | 'create';
    onSuccess: () => void;
};
const daftarTingkat = ['10', '11', '12'];

export default function FormKelas({
    dataKelas,
    onSuccess,
    type,
}: FormKelasProps) {
    const dataAPI = usePage<{ data: kelasAPI }>().props.data;
    const { data, setData, post, errors, reset, processing } = useForm({
        kode_jurusan: dataKelas?.kode_jurusan ?? '',
        rombel: dataKelas?.rombel ?? '',
        tingkat: dataKelas?.tingkat != null ? String(dataKelas.tingkat) : '',
    });
    const handleSumbit = () => {
        if (type === 'create') {
            post(kelas.store().url, {
                onSuccess: () => {
                    reset();
                    onSuccess();
                },
            });
        } else {
            post(kelas.update(dataKelas?.kode_kelas || '-').url, {
                onSuccess: () => {
                    reset();
                    onSuccess();
                },
            });
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSumbit();
            }}
        >
            <FieldGroup>
                <Field>
                    <FieldLabel>Tingkat</FieldLabel>
                    {errors.tingkat && (
                        <FieldError>{errors.tingkat}</FieldError>
                    )}
                    <Select
                        value={data.tingkat}
                        onValueChange={(e) => setData('tingkat', e)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Tingkat" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {daftarTingkat.map((item) => (
                                    <SelectItem value={item} key={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
                <Field>
                    <FieldLabel>Jurusan</FieldLabel>
                    {errors.kode_jurusan && (
                        <FieldError>{errors.kode_jurusan}</FieldError>
                    )}
                    <Select
                        value={data.kode_jurusan}
                        onValueChange={(e) => setData('kode_jurusan', e)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Jurusan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {dataAPI.DJurusan.map((item) => (
                                    <SelectItem
                                        value={item.kode_jurusan}
                                        key={item.kode_jurusan}
                                    >
                                        {item.kode_jurusan}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
                <Field>
                    <FieldLabel>Rombel</FieldLabel>
                    {errors.tingkat && (
                        <FieldError>{errors.tingkat}</FieldError>
                    )}
                    <Input
                        value={data.rombel}
                        onChange={(e) => setData('rombel', e.target.value)}
                        placeholder="Contoh: 1 atau A"
                    />
                </Field>
                <div className="flex items-center justify-end">
                    <Button type="submit" disabled={processing}>
                        Submit
                    </Button>
                </div>
            </FieldGroup>
        </form>
    );
}
